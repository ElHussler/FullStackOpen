const { test, after, beforeEach, describe } = require('node:test')
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

test('if likes property is missing default to zero', async () => {
    const newBlog = {
        title: "ADDED BY TEST WITHOUT LIKES PROPERTY",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogSavedInDb = (await Blog.find({ title: newBlog.title })).map(blog => blog.toJSON())

    assert.strictEqual(blogSavedInDb[0].likes, 0)
})

describe('POST new blog post', () => {
    test('if title property is missing return 400 bad request', async () => {
        const newBlog = {
            author: "Michael Chan WITHOUT A BLOG TITLE",
            url: "https://reactpatterns.com/",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    test('if url property is missing return 400 bad request', async () => {
        const newBlog = {
            title: "ADDED BY TEST WITHOUT URL",
            author: "Michael Chan WITHOUT A URL",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})