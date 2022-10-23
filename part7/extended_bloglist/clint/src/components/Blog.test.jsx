import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'

describe('<Blog/>', () => {
  let component = null
  const blog = {
    title: 'sdg',
    author: 'sdgds',
    url: 'http://localhost:3000/',
    user: { name: 'root', username: 'root', id: '63403d927f8cdd56ae51b379' },
    likes: 6,
    id: '63423cfc4f0ddc4dbd9d8897'
  }
  const likeMockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateBlog={likeMockHandler}
        deleteBlog={jest.fn()}
        userId="63423cfc4f0ddc4dbd9d8897"
      />
    ).container
  })

  test('At frist only blog title and blog author only show not likes and url', () => {
    expect(component.querySelector('.title')).toHaveTextContent(blog.title)
    expect(component.querySelector('.author')).toHaveTextContent(blog.author)
    screen.getByText(blog.title)
    expect(component.querySelector('.url')).not.toBeInTheDocument()
    expect(component.querySelector('.likes')).not.toBeInTheDocument()
  })
  test('After Clicking view it will url and likes', () => {
    const viewButton = component.querySelector('.viewButton')
    fireEvent.click(viewButton)
    expect(component.querySelector('.url')).toHaveTextContent(blog.url)
    expect(component.querySelector('.likes')).toBeInTheDocument()
  })
  test('if the Like button is clicked twice, the event handler is also called twice', () => {
    const viewButton = component.querySelector('.viewButton')
    fireEvent.click(viewButton)

    const likeButton = component.querySelector('.likesButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})
