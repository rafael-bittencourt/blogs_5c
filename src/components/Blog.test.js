import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog renders the blog\'s title by default', () => {
  const blog = {
    title: 'Titulo 1',
    author: 'Autor 1',
    url: 'Google.com',
    likes: 0,
    user: {
      id: '12345'
    }
  }

  const userLogged = {
    id: '12345',
    username: 'rb23',
    name: 'Rafael'
  }

  const { container } = render(<Blog blog={blog} userLogged={userLogged}/>)

  screen.debug()

  const div = container.querySelector('.blog-collapsed')
  expect(div).toHaveTextContent('Titulo 1')
})

test('blog does not render the blog\'s author by default', () => {
  const blog = {
    title: 'Titulo 1',
    author: 'Autor 1',
    url: 'Google.com',
    likes: 0,
    user: {
      id: '12345'
    }
  }

  const userLogged = {
    id: '12345',
    username: 'rb23',
    name: 'Rafael'
  }

  const { container } = render(<Blog blog={blog} userLogged={userLogged}/>)

  screen.debug()

  const div = container.querySelector('.blog-collapsed')
  expect(div).not.toHaveTextContent('Autor 1')
})

test('blog renders the blog\'s url when expanded', () => {
  const blog = {
    title: 'Titulo 1',
    author: 'Autor 1',
    url: 'Google.com',
    likes: 0,
    user: {
      id: '12345'
    }
  }

  const userLogged = {
    id: '12345',
    username: 'rb23',
    name: 'Rafael'
  }

  const { container } = render(<Blog blog={blog} userLogged={userLogged}/>)

  screen.debug()

  const div = container.querySelector('.blog-expanded')
  expect(div).toHaveTextContent('URL')
})

test('clicking the like button 2x calls the event handler 2 times', async () => {
  const blog = {
    title: 'Titulo 1',
    author: 'Autor 1',
    url: 'Google.com',
    likes: 0,
    user: {
      id: '12345'
    }
  }

  const userLogged = {
    id: '12345',
    username: 'rb23',
    name: 'Rafael'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} userLogged={userLogged} addLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})