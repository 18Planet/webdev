const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const blog = new Blog(request.body)

  const user = request.user
  blog.user = user.id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const userId = user.id.toString()

  // Find the user of the blog wanting to be deleted
  const blog = await Blog.findById(request.params.id)
  const blogUserId = blog.user.toString()

  console.log(blog.user.toJSON())

  console.log(userId, blogUserId)
  if (userId === blogUserId) {
    // Correct verification, delete blog
    await Blog.findByIdAndDelete(request.params.id)
  } else {
    return response.status(403).json({ error: 'resource cannot be deleted, invalid permissions'})
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter