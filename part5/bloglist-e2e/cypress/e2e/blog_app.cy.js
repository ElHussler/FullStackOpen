describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username:')
    cy.contains('password:')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()

      cy.contains('mluukkai Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'mluukkai Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#newTitle').type('this is a new blog title')
      cy.get('#newAuthor').type('this is a new blog author')
      cy.get('#newUrl').type('this.is.a.new.blog.url')
      cy.get('#createBlogButton').click()

      cy.get('div.blogTitleAuthor').contains('this is a new blog title')
      cy.contains('New Blog: "this is a new blog title" added to list')
    })

    describe('and a blog exists', function () {
      beforeEach(function() {
        cy.createBlog({
          title: 'this is a new blog title',
          author: 'this is a new blog author',
          url: 'this.is.a.new.blog.url'
        })
      })

      it('a user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('Likes: 0').contains('like').click()
        cy.contains('Likes: 1')
      })
    })
  })
})