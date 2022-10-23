const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const { usersInDb } = require('./user_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})
test('Sucessfuly add one User', async () => {
    const newUser = {
        name: 'SJndd',
        username: 'abcdef',
        password: '12345'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
})
test('invalid users are not created', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
        name: 'dd',
        username: 'ef',
        password: '5'
    }
    await api.post('/api/users').send(newUser).expect(400)
    const usersAtEnd = await usersInDb()
    expect(usersAtStart.length).toBe(usersAtEnd.length)
})

afterAll(() => {
    mongoose.connection.close()
})
