const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})
  
blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.title || !request.body.url)
    return response.status(400).end()

  const { title, author, url, likes } = request.body
  const userInDb = await User.findOne()
  console.log('uiserindb: ', userInDb)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: userInDb.id
  })

  const savedBlog = await blog.save()
  userInDb.blogs = userInDb.blogs.concat(savedBlog._id)
  await userInDb.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter