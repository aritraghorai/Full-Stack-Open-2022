const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blogs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { initialBlogs, blogsInDb } = require('./blog_test_helper')
const { JWT_SECRET } = require('../utils/config')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('when there are some blog in the data base', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        const ids = response.body.map((blog) => blog.id)
        for (let id of ids) {
            expect(id).toBeDefined()
        }
    })
})

describe('addition of new blog post', () => {
    let token = null
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('12345', 10)
        const newUser = await new User({
            name: 'arnnn',
            username: 'arnnn',
            passwordHash
        }).save()
        token = jwt.sign(
            { user: newUser.username, id: newUser._id },
            JWT_SECRET
        )
    })
    test('verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
        const newBlog = {
            title: 'Promises chaining',
            author: 'Unknown',
            url: 'https://javascript.info/promise-chaining'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

        const contents = blogsAtEnd.map((n) => n.title)
        expect(contents).toContain('Promises chaining')
    })
    test(' if the likes property is missing from the request, it will default to the value 0. ', async () => {
        const newBlog = {
            title: 'New wheelDeltaY',
            author: 'Unknown',
            url: 'https://javascript.info/promise-chaining'
        }
        const res = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(res.body.likes).toBe(0)
    })
    test('Creating new blogs via the /api/blogs endpoint, that verifies that if the title properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
        const newBlog = {
            author: 'Unknown',
            url: 'https://javascript.info/promise-chaining'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
    test('Creating new blogs via the /api/blogs endpoint, that verifies that if the Url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', async () => {
        const newBlog = {
            title: 'hi',
            author: 'Unknown'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
})

describe('deletion of a blog post', () => {
    let token = null
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany()
        const passwordHash = await bcrypt.hash('12345', 10)
        const newUser = await new User({
            name: 'arnnn',
            username: 'arnnn',
            passwordHash
        }).save()
        token = jwt.sign(
            { user: newUser.username, id: newUser._id },
            JWT_SECRET
        )
        const newBlog = {
            title: 'New wheelDeltaY',
            author: 'Unknown',
            url: 'https://javascript.info/promise-chaining'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        return
    })
    test('sucessful delete 204 status code', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const contents = blogsAtEnd.map((r) => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })
    test('delete blog without token give 401 not authorized access error', async () => {
        const newBlog = {
            title: 'New wheelDeltaY',
            author: 'Unknown',
            url: 'https://javascript.info/promise-chaining'
        }
        const createdBlog = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        await api.delete(`/api/blogs/${createdBlog.body.id}`).expect(401)
    })
})
describe('updatation of blog', () => {
    test('Updating the information of an individual blog post.if sucess it give 200 status code', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 30 })
            .expect(200)
        const getUpdatedBlog = await api
            .get(`/api/blogs/${blogToUpdate.id}`)
            .expect(200)
        expect(getUpdatedBlog.body.likes).toBe(30)
    })
})
afterAll(() => {
    mongoose.connection.close()
})
