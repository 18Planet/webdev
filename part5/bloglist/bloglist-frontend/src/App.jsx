import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

  const setErrorMessage = message => {
    setError(true)
    setNotification(message)
  }

  const setMessage = message => {
    setError(false)
    setNotification(message)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit = {handleLogin}>
      <div>
        Username: 
          <input type = "text" value = {username} name = "Username"
          onChange = {({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        Password: 
          <input type = "password" value = {password} name = "Password"
          onChange = {({ target }) => setPassword(target.value)}
          />
      </div>
      <button type = "submit">Login</button>
    </form>
  )

  const submitBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        
        setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })

    blogFormRef.current.toggleVisibility()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message = {notification} error = {error} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <p>{user.username} logged in</p>
      <button onClick = {() => {
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
      }}>Log out</button>
      <Notification message = {notification} error = {error} />
      <h2>New Blog</h2>
      <Togglable buttonLabel = {"Create new blog"} ref = {blogFormRef}>
        <BlogForm createBlog = {submitBlog} setMessage = {setMessage}/>
      </Togglable>
      
      <p></p>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App