import { useState } from 'react'
const Blog = ({ blog, userLogged, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    {console.log(userLogged.username, blog.user.username)}
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLike(blog.id, blogObject)
  }

  const deleteBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blog-collapsed'>
        {blog.title}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='blog-expanded'>
        {blog.title}
        <button onClick={toggleVisibility}>Hide</button>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleLike}>Like</button></p>
        <p>User: {blog.user.username || userLogged.username}</p>
        {(userLogged.username === blog.user.username || !blog.user.username) &&
          <button onClick={deleteBlog}>Remove</button>
        }
      </div>
    </div>
  )}

export default Blog