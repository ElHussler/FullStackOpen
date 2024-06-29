import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, userAdded }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user.id
    }

    updateBlog(updatedBlog)
  }

  const showRemovePrompt = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenAddedByUser = { display: userAdded ? '' : 'none' }
  const detailsButtonLabel = visible ? 'cancel' : 'view'

  return (
    <div style={blogStyle}>
      <div className='blogTitleAuthor'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{detailsButtonLabel}</button>
      </div>
      <div className='blogUrlLikes' style={showWhenVisible}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>
          Added by user: {blog.user.name}
        </div>
        <button style={showWhenAddedByUser} onClick={showRemovePrompt}>remove</button>
      </div>
    </div>
  )
}

export default Blog