const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./blog_test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('GET blog posts', () => {
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
})

describe('POST new blog post without valid token', () => {
    test('returns 401', async () => {
        const newBlog = {
            title: "ADDED BY TEST",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 69,
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    test('returns expected error message', async () => {
        const newBlog = {
            title: "ADDED BY TEST",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 69,
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
        
        assert(response.body.error.includes("token invalid"))
    })
})

describe('POST new blog post with valid token', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash, name: 'john smith' })
    
        await user.save()
    })

    test('creates new blog post', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: "root", password: "sekret" })

        const newBlog = {
            title: "ADDED BY TEST",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${response.body.token}`) // Using the superagent behind supertest
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsInDb = (await Blog.find({})).map(blog => blog.toJSON())
        const titles = blogsInDb.map(b => b.title)

        assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)
        assert(titles.includes('ADDED BY TEST'))
    })

    test('if likes property is missing default to zero', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: "root", password: "sekret" })

        const newBlog = {
            title: "ADDED BY TEST WITHOUT LIKES PROPERTY",
            author: "Michael Chan",
            url: "https://reactpatterns.com/"
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${response.body.token}`) // Using the superagent behind supertest
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogSavedInDb = (await Blog.find({ title: newBlog.title })).map(blog => blog.toJSON())

        assert.strictEqual(blogSavedInDb[0].likes, 0)
    })

    test('if title property is missing return 400 bad request', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: "root", password: "sekret" })

        const newBlog = {
            author: "Michael Chan WITHOUT A BLOG TITLE",
            url: "https://reactpatterns.com/",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${response.body.token}`) // Using the superagent behind supertest
            .send(newBlog)
            .expect(400)
    })

    test('if url property is missing return 400 bad request', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: "root", password: "sekret" })

        const newBlog = {
            title: "ADDED BY TEST WITHOUT URL",
            author: "Michael Chan WITHOUT A URL",
            likes: 69,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${response.body.token}`) // Using the superagent behind supertest
            .send(newBlog)
            .expect(400)
    })
})

describe('DELETE single blog post', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash, name: 'john smith' })
    
        await user.save()
    })

    test('succeeds with 204 code if id is valid', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: "root", password: "sekret" })

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set('Authorization', `Bearer ${response.body.token}`) // Using the superagent behind supertest
          .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(b => b.title)
        assert(!titles.includes(blogToDelete.title))
    })
    
    test('fails with 204 code if id is invalid', async () => {
        const response = await api
            .post('/api/login')
            .send({ username: "root", password: "sekret" })

        const blogsAtStart = await helper.blogsInDb()
        const blogIdToDelete = await helper.nonExistingId()

        await api
          .delete(`/api/blogs/${blogIdToDelete}`)
          .set('Authorization', `Bearer ${response.body.token}`) // Using the superagent behind supertest
          .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
})

describe('PUT update an existing blog', () => {
    test('blog updates number of likes on successful update', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            title: "React patterns BUT UPDATED",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 12345
        }

        const result = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(updatedBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[0].likes, updatedBlog.likes)
    })
})

after(async () => {
    await mongoose.connection.close()
})