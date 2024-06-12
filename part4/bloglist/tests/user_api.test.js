const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash, name: 'john smith' })

    await user.save()
})


describe('when a create user request is submitted with a username that is too short', () => {
    test('the user is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newInvalidUser = {
            username: 'UN',
            password: 'UserWithShortUsername',
            name: 'some name'
        }

        const response = await api
            .post('/api/users')
            .send(newInvalidUser)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
        assert(!usersAtEnd.map(u => u.username).includes('UN'))
    })

    test('a 400 status code is returned', async () => {
        const newInvalidUser = {
            username: 'UN',
            password: 'UserWithShortUsername',
            name: 'some name'
        }

        await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect(400)
    })

    test('the correct error message is returned in JSON format', async () => {
        const newInvalidUser = {
            username: 'UN',
            password: 'UserWithShortUsername',
            name: 'some name'
        }

        const response = await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect('Content-Type', /application\/json/)
        
        const expectedError = `User validation failed: username: Path \`username\` (\`${newInvalidUser.username}\`) is shorter than the minimum allowed length (3)`
        assert(response.body.error.includes(expectedError))
    })
})


describe('when a create user request is submitted with a username that already exists', () => {
    test('the user is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newInvalidUser = {
            username: 'root',
            password: 'dknfaasjdgadfsdfogns',
            name: 'some name'
        }

        await api
            .post('/api/users')
            .send(newInvalidUser)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
        assert(usersAtEnd.filter(u => u.username === "root").length === 1)
    })

    test('a 400 status code is returned', async () => {
        const newInvalidUser = {
            username: 'root',
            password: 'dknfaasjdgadfsdfogns',
            name: 'some name'
        }

        await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect(400)
    })

    test('the correct error message is returned in JSON format', async () => {
        const newInvalidUser = {
            username: 'root',
            password: 'dknfaasjdgadfsdfogns',
            name: 'some name'
        }

        const response = await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect('Content-Type', /application\/json/)

        assert(response.body.error.includes('expected `username` to be unique'))
    })
})


describe('when a create user request is submitted with a password that is too short', () => {
    test('the user is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newInvalidUser = {
            username: 'UserWithTooShortPassword',
            password: 'PW',
            name: 'some name'
        }

        await api
            .post('/api/users')
            .send(newInvalidUser)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
        assert(!usersAtEnd.map(u => u.username).includes('UserWithTooShortPassword'))
    })

    test('a 400 status code is returned', async () => {
        const newInvalidUser = {
            username: 'UserWithTooShortPassword',
            password: 'PW',
            name: 'some name'
        }

        await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect(400)
    })

    test('the correct error message is returned in JSON format', async () => {
        const newInvalidUser = {
            username: 'UserWithTooShortPassword',
            password: 'PW',
            name: 'some name'
        }

        const response = await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect('Content-Type', /application\/json/)
        
        assert(response.body.error.includes('password does not meet requirements'))
    })
})


describe('when a create user request is submitted without a password', () => {
    test('the user is not created', async () => {
        const usersAtStart = await helper.usersInDb()

        const newInvalidUser = {
            username: 'UserWithoutPassword',
            password: '',
            name: 'some name'
        }

        await api
            .post('/api/users')
            .send(newInvalidUser)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
        assert(!usersAtEnd.map(u => u.username).includes('UserWithoutPassword'))
    })

    test('a 400 status code is returned', async () => {
        const newInvalidUser = {
            username: 'UserWithoutPassword',
            password: '',
            name: 'some name'
        }

        await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect(400)
    })

    test('the correct error message is returned in JSON format', async () => {
        const newInvalidUser = {
            username: 'UserWithoutPassword',
            password: '',
            name: 'some name'
        }

        const response = await api
            .post('/api/users')
            .send(newInvalidUser)
            .expect('Content-Type', /application\/json/)
        
        assert(response.body.error.includes('password does not meet requirements'))
    })
})

after(async () => {
    await mongoose.connection.close()
})