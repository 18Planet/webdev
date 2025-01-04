const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const bcrypt = require('bcrypt')

const api = supertest(app)
describe('With initial set of blogs', () => {
  let token = undefined
  beforeEach(async () => {
    await Blog.deleteMany({})
      for (let blog of helper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
      }
    
    // do test user login
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    // login
    const api_response = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'secret'
      })
    token = api_response.body.token
    
  })

  describe('Check accessed blogs are correct', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('correct number of blogs', async () => {
      const response = await api.get('/api/blogs')
      
      assert.strictEqual(response.body.length, helper.blogs.length)
    })
    
    test('identifier is correct', async () => {
      const response = await api.get('/api/blogs')
    
      assert((response.body[0].id))
      assert(!(response.body[0]._id))
    })
  })

  describe('Handling error detection', () => {
    test('successfully give error on bad request', async () => {
      const noTitleBlog = {
        author: "Gavin",
        url: "www.corn.com",
        likes: 0
      }
    
      const noURLBlog = {
        title: "this should work maybe",
        author: "Gavin",
        likes: 0
      }
    
      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(noTitleBlog)
        .expect(400)
    
      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        .send(noURLBlog)
        .expect(400)
    })
  })
  
  describe('Successfully deleting a blog', () => {
    test('successfully make a new post', async () => {
      const newBlog = {
        title: "this should work maybe",
        author: "Gavin",
        url: "www.corn.com"
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .set('Authorization', 'Bearer ' + token)
      
      const response = await api.get('/api/blogs')
      
      assert.strictEqual(response.body.length, helper.blogs.length + 1)
      
      // Test to see if default value of 0 is set for likes
      if (!newBlog.likes) {
        assert.strictEqual(response.body[response.body.length - 1].likes, 0)
      }
    })

    test('successfully deleted the new post', async () => {
      const response = await api.get('/api/blogs')
      const blog_to_delete = response.body[response.body.length - 1]
      const id = blog_to_delete.id
  
      const blogsBefore = await helper.blogsInDb()
  
      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
      
      const blogsAfter = await helper.blogsInDb()
      
      assert.strictEqual(blogsBefore.length, blogsAfter.length + 1)
      assert(!blogsAfter.map(b => b.content).includes(blog_to_delete))
  
    })
  })

  describe('PUT', () => {
    test('Change the first title', async () => {
      const changedBlog = {
        title: "ooo scary changed"
      }

      const response = await api.get('/api/blogs')
      const id = response.body[0].id

      await api
        .put(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(changedBlog)
      
      const newResponse = await api.get('/api/blogs')
      const newBlog = newResponse.body[0]

      assert.strictEqual(newBlog.title, "ooo scary changed")
    })
  })

})


after(async () => {
  await mongoose.connection.close()
})