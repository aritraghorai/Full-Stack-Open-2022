const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blogs')
const { initialBlogs, blogsInDb } = require('./blog_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 1000000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((r) => r.title)

    expect(contents).toContain('Canonical string reduction')
})

test('a valid blogs can be added ', async () => {
    const newBlog = {
        title: 'Promises chaining',
        author: 'Unknown',
        url: 'https://javascript.info/promise-chaining'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const contents = blogsAtEnd.map((n) => n.title)
    expect(contents).toContain('Promises chaining')
})
test('blog without content is not added', async () => {
    const newBlog = {
        url: 'fsfgs'
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const notesAtEnd = await blogsInDb()

    expect(notesAtEnd).toHaveLength(initialBlogs.length)
})
test('a specific blog can be viewed', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const resultBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(resultBlogToView)
})
test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
})
afterAll(() => {
    mongoose.connection.close()
})
