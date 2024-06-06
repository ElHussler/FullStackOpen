const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const favouriteBlog = blogs.reduce((prev, current) => prev && prev.likes > current.likes ? prev : current, null)
    
    if (!favouriteBlog)
        return null

    return  {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        likes: favouriteBlog.likes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}