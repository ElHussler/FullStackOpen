const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favourite blog', () => {
  const favouriteBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }

  const nonFavouriteBlog = {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7
  }

  test('of blog with highest likes is favourite', () => {
    assert.deepStrictEqual(listHelper.favouriteBlog(blogs), favouriteBlog)
  })  

  test('of blog with lower number of likes is not favourite', () => {
    assert.notDeepStrictEqual(listHelper.favouriteBlog(blogs), nonFavouriteBlog)
  })

  test('of only blog in list is favourite', () => {
    assert.deepStrictEqual(listHelper.favouriteBlog([favouriteBlog]), favouriteBlog)
  })

  test('of no blogs in list returns null', () => {
    assert.deepStrictEqual(listHelper.favouriteBlog([]), null)
  })
})

describe('most blogs', () => {
  const mostBlogsAuthor = {
    author: "Robert C. Martin",
    blogs: 3
  }

  const lowerBlogsAuthor = {
    author: "Bibbity Bobbity",
    blogs: 2
  }

  const leastBlogsAuthor = {
    author: "Jiminy Billy Bob",
    blogs: 0
  }

  test('of author with most blogs is returned', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), mostBlogsAuthor)
  })
  test('of author with lower number of blogs is not returned', () => {
    assert.notDeepStrictEqual(listHelper.mostBlogs(blogs), lowerBlogsAuthor)
  })
  test('of author with no blogs is not returned', () => {
    assert.notDeepStrictEqual(listHelper.mostBlogs(blogs), leastBlogsAuthor)
  })
})