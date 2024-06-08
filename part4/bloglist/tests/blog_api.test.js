const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('GET returns correct number of blog posts in json format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique id blog post property is named id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
    
    const blogPost = response.body[0]
    
    assert.strictEqual(Object.keys(blogPost).includes('id'), true)
})

test('POST creates new blog post', async () => {
    const newBlog = {
        title: "ADDED BY TEST",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 69,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsInDb = (await Blog.find({})).map(blog => blog.toJSON())
    const titles = blogsInDb.map(b => b.title)

    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)
    assert(titles.includes('ADDED BY TEST'))
})

after(async () => {
    await mongoose.connection.close()
})