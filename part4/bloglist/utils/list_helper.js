const blog = require("../models/blog")
const _ = require("lodash")

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

const mostBlogs = (blogs) => {
    var result = _(blogs).countBy('author').entries().maxBy(_.last)

    if (!result)
        return null

    return {
        author: result[0],
        blogs: result[1]
    }
}

const mostLikes = (blogs) => {
    const liked = blogs
      .reduce(({sums,most}, {likes, author}) => {
        sums[author] = likes = (sums[author] || 0) + likes;
        if (likes > most.likes) most = {author,likes};
        return {sums,most};
      }, {sums: {}, most: {likes:0} })
      .most;

    return liked
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}