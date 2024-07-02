import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(null)
    }
    catch (exception) {
      console.log('error: ', exception)
      setIsErrorMessage(true)
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      addBlogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)

      setBlogs(blogs.concat(blog))
      setIsErrorMessage(false)
      setMessage(`New Blog: "${blog.title}" added to list`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
    catch (exception) {
      console.log('error: ', exception)
      setIsErrorMessage(true)
      setMessage('invalid blog')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const blog = await blogService.update(updatedBlog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : blog))
    }
    catch (exception) {
      console.log('error: ', exception)
      setIsErrorMessage(true)
      setMessage('invalid blog update')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter(b => b.id !== blogId))
    }
    catch (exception) {
      console.log('error: ', exception)
      setIsErrorMessage(true)
      setMessage('invalid blog delete')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const addBlogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={message} isErrorMessage={isErrorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type='text'
              value={username}
              id="username"
              onChange={({ target }) => {setUsername(target.value)}}
            />
          </div>
          <div>
            password:
            <input type='password'
              value={password}
              id="password"
              onChange={({ target }) => {setPassword(target.value)}}
            />
          </div>
          <button id='loginButton' type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
      <h2>blogs</h2>

      <Notification message={message} isErrorMessage={isErrorMessage} />

      <p>{user.username} {user.name} logged in</p>

      <Togglable buttonLabel="create new blog" ref={addBlogFormRef}>
        <AddBlogForm createBlog={createBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            userAdded={user.username === blog.user.username} />
        )}
    </div>
  )
}

export default App