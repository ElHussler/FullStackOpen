import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm /> component', () => {
  test('form calls event handler received in props with correct details', async () => {
    const mockHandler = vi.fn()
    const user = userEvent.setup()

    render(<AddBlogForm createBlog={mockHandler} />)

    const newTitleText = 'addblogform title'
    const inputTitle = screen.getByPlaceholderText('enter a title')
    await user.type(inputTitle, newTitleText)

    const newAuthorText = 'addblogform author'
    const inputAuthor = screen.getByPlaceholderText('enter an author')
    await user.type(inputAuthor, newAuthorText)

    const newUrlText = 'addblogform.url'
    const inputUrl = screen.getByPlaceholderText('enter a url')
    await user.type(inputUrl, newUrlText)

    const buttonCreate = screen.getByText('create')
    await user.click(buttonCreate)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(newTitleText)
    expect(mockHandler.mock.calls[0][0].author).toBe(newAuthorText)
    expect(mockHandler.mock.calls[0][0].url).toBe(newUrlText)
  })
})