const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  if (!request.body.title || !request.body.url)
    return response.status(400).end()

  const { title, author, url, likes } = request.body
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })

  console.log(blog)

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const returnedBlog = await Blog
    .findById(savedBlog._id)
    .populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'user does not have permission to delete this blog'})
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter