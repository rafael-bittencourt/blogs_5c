import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [updatedBlogs, setUpdatedBlogs] = useState(false)
  const blogFormRef = useRef()


  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      // local storage of the login
      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setMessageType('green')
      setMessage(`${user.name} was logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (exception) {
      setMessageType('red')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs( blogs )
      })
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setUpdatedBlogs(!updatedBlogs)
    setMessageType('green')
    setMessage(`${returnedBlog.title} was added to the list`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removeBlog = async id => {
    await blogService.remove(id)
    setUpdatedBlogs(!updatedBlogs)
  }

  const addLike = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    setUpdatedBlogs(!updatedBlogs)
  }

  return (
    <div>
      <Notification message={message} type={messageType} />
      {!user &&
        <Togglable buttonLabel='login'>
          <LoginForm login={handleLogin} />
        </Togglable>
      }
      {user &&
        <>
          {user.username} logged in <button onClick={logout}>logout</button>
          <Togglable buttonLabel="Add new" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div>
            <h2>blogs</h2>
            {
              blogs.map(blog =>
                <Blog key={blog.id} blog={blog} userLogged={user} addLike={addLike} removeBlog={removeBlog}/>
              )}
          </div>
        </>
      }
    </div>
  )
}

export default App