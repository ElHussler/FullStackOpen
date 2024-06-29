import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

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
})