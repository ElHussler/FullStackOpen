import { useState } from "react" 

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const handleAddBlogSubmit = (event) => {
    event.preventDefault()

    createBlog({ title, author, url })
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlogSubmit}>
        <div>
          title:
          <input 
            type='text'
            value={title} 
            onChange={({ target }) => { setTitle(target.value) }} />
        </div>
        <div>
          author:
          <input 
            type='text' 
            value={author} 
            onChange={({ target }) => { setAuthor(target.value) }} />
        </div>
        <div>
          url:
          <input 
            type='text' 
            value={url} 
            onChange={({ target }) => { setUrl(target.value) }} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm