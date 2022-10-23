import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'

describe('<AddBlogForm/>', () => {
  let component = null
  const handleSubmitHandler = jest.fn()
  beforeEach(() => {
    component = render(<AddBlogForm addBlog={handleSubmitHandler} />).container
  })
  test('The test should check, that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const titleText = component.querySelector('input[name=title]')
    const authorText = component.querySelector('input[name=author]')
    const urlText = component.querySelector('input[name=url]')
    const button = await screen.findByText('create')
    const user = userEvent.setup()
    await user.type(titleText, 'title')
    await user.type(authorText, 'author')
    await user.type(urlText, 'http://localhost:3000/')
    await user.click(button)
    expect(handleSubmitHandler.mock.calls).toHaveLength(1)
    expect(handleSubmitHandler.mock.calls[0][0].title).toBe('title')
    expect(handleSubmitHandler.mock.calls[0][0].author).toBe('author')
    expect(handleSubmitHandler.mock.calls[0][0].url).toBe(
      'http://localhost:3000/'
    )
  })
})
