const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('When there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))

  })
})

describe('Validating user creation error detection', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  
  test('Duplicate users cannot be created', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = {
      username: 'root',
      name: 'bad user :(',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('User and password must be included', async () => {
    const usersAtStart = await helper.usersInDb()

    const noUsername = {
      name: 'bad user :(',
      password: 'secret'
    }

    const noPassword = {
      username: 'dub',
      name: 'bad user :(',
    }

    await api
      .post('/api/users')
      .send(noUsername)
      .expect(400)
    
    await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('User and password specifications must be correct', async () => {
    const usersAtStart = await helper.usersInDb()

    const incorrectUsername = {
      username: 'db',
      name: 'bad user :(',
      password: 'secret'
    }

    const incorrectPassword = {
      username: 'dub',
      name: 'bad user :(',
      password: 'st'
    }

    await api
      .post('/api/users')
      .send(incorrectUsername)
      .expect(400)
    
    await api
      .post('/api/users')
      .send(incorrectPassword)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)

  })
})

after(async () => {
  await mongoose.connection.close()
})