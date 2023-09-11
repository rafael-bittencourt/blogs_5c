import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        Title:
        <input
          type="text"
          value={newTitle}
          placeholder='write the title here'
          onChange={event => setNewTitle(event.target.value)}
        />
        Author:
        <input
          type="text"
          value={newAuthor}
          placeholder='write the author here'
          onChange={event => setNewAuthor(event.target.value)}
        />
        Url:
        <input
          type="text"
          value={newUrl}
          placeholder='write the url here'
          onChange={event => setNewUrl(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default BlogForm