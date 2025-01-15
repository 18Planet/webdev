import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    })

    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogURL('')
  }

  return (
    <div>
      <form onSubmit = {submitBlog}>
        Title: <input value = {newBlogTitle} onChange = {(event) => setNewBlogTitle(event.target.value)}></input><br></br>
        Author: <input value = {newBlogAuthor} onChange = {(event) => setNewBlogAuthor(event.target.value)}></input><br></br>
        URL: <input url = {newBlogURL} onChange = {(event) => setNewBlogURL(event.target.value)}></input><br></br>
        <button type = "submit">Submit blog</button>
      </form>
    </div>
  )
}

export default BlogForm