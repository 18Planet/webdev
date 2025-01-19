import { useState, useEffect } from 'react'
import axios from 'axios'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = {display : visible ? "" : "none"}
  const hideWhenVisible = {display : visible ? "none" : ""}

  const changeVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    
  })

  return (
    <div style = {blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author} <button onClick = {changeVisibility}>View</button>
      </div>
      <div style = {showWhenVisible}>
        {blog.title} by {blog.author} <button onClick = {changeVisibility}>Hide</button><br></br>
        URL: {blog.url}<br></br>
        Likes: {blog.likes} <button>Like</button><br></br> 
      </div>
    </div>  
  )
}

export default Blog