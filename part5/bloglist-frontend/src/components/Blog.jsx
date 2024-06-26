import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    // blog.likes + 1
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const detailsButtonLabel = visible ? "cancel" : "view"

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{detailsButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          Author: {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
      </div>
    </div>
  )
}

export default Blog