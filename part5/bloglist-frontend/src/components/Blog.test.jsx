import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> component', () => {
  test('renders blog title and author but not blog URL or number of likes by default', () => {
    const blog = {
      title: 'test blog title #1',
      author: 'test blog author #1',
      url: 'test.blog.url.1',
      likes: 1,
      user: {
        name: 'username1'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const divTitleAuthor = container.querySelector('.blogTitleAuthor')
    const divUrlLikes = container.querySelector('.blogUrlLikes')

    expect(divTitleAuthor).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(divUrlLikes).toHaveStyle('display: none')
  })

  test('renders url and likes after view button is clicked', async () => {
    const blog = {
      title: 'test blog title #1',
      author: 'test blog author #1',
      url: 'test.blog.url.1',
      likes: 1,
      user: {
        name: 'username1'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const divUrlLikes = container.querySelector('.blogUrlLikes')

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(divUrlLikes).not.toHaveStyle('display: none')
  })

  test('calls update blog event twice when like button is pressed twice', async () => {
    const blog = {
      title: 'test blog title #1',
      author: 'test blog author #1',
      url: 'test.blog.url.1',
      likes: 1,
      user: {
        name: 'username1'
      }
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    const buttonView = screen.getByText('view')
    const buttonLike = screen.getByText('like')

    await user.click(buttonView)
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})