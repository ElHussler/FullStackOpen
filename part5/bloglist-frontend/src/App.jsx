import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
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
    }
    catch (exception) {
      console.log("error: ", exception)
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

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const blog = await blogService.create(newBlog)
      
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`New Blog: "${blog.title}" added to list`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      console.log("error: ", exception)
      setMessage('invalid blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={message} />

        <form onSubmit={handleLogin}>
          <div>
            username: 
            <input 
              type='text'
              value={username}
              name="Username"
              onChange={({target}) => {setUsername(target.value)}}
            />
          </div>
          <div>
            password: 
            <input type='password' 
              value={password} 
              name="Password"
              onChange={({target}) => {setPassword(target.value)}}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
      <h2>blogs</h2>

      <Notification message={message} />

      <p>{user.name} logged in</p>

      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input 
            type='text'  
            name='Title'
            value={title} 
            onChange={({ target }) => { setTitle(target.value) }} />
        </div>
        <div>
          author:
          <input 
            type='text' 
            name='Author'
            value={author} 
            onChange={({ target }) => { setAuthor(target.value) }} />
        </div>
        <div>
          url:
          <input 
            type='text' 
            name='Url'
            value={url} 
            onChange={({ target }) => { setUrl(target.value) }} />
        </div>
        <button type='submit'>create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App