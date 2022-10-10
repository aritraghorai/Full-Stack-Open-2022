describe('Blogs App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Aritra Ghorai',
      username: 'aritra',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    const user2 = {
      name: 'root',
      username: 'root',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('log in to application')
  })
  describe('Login', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
    })
    it('pass with right credentials', function () {
      cy.get('input[name=username]').type('aritra')
      cy.get('input[name=password]').type('12345')
      cy.get('button').click()
      cy.contains('Login Sucessfuly')
    })
    it('fails with wrong credentials', function () {
      cy.get('input[name=username]').type('aritra')
      cy.get('input[name=password]').type('123')
      cy.get('button').click()
      cy.contains('Invalid username and password')
    })
  })
  describe('create blog', function () {
    beforeEach(function () {
      cy.login({ username: 'aritra', password: '12345' })
    })
    it('createing a new blog by login user', function () {
      cy.contains('create').click()
      cy.get('input[name=title]').type('A Fake Blog')
      cy.get('input[name=author]').type('Cypress')
      cy.get('input[name=url]').type('http://google.com')
      cy.get('#createBlog').click()
    })
  })
  describe('delete a blog', function () {
    beforeEach(function () {
      cy.login({ username: 'aritra', password: '12345' })
      cy.addBlog({
        title: 'A cypress blog',
        author: 'cypress',
        url: 'http://google.com'
      })
    })
    it('who created the blog can also delete the blog', function () {
      cy.contains('A cypress blog').parent().find('button').click()
      cy.get('#deleteBtn').click()
      cy.get('html').should('not.contain', 'A cypress blog')
    })
    it('if a user does not create the blog then he did not see the remove button', function () {
      cy.login({ username: 'root', password: '12345' })
      cy.contains('A cypress blog').parent().find('button').click()
      cy.contains('A cypress blog').parent().should('not.contain', 'remove')
    })
  })
  describe('blogs are ordered according to likes with the blog with the most likes being first.', function () {
    beforeEach(function () {
      cy.login({ username: 'aritra', password: '12345' })
      cy.addBlog({
        title: 'A Frist blog',
        author: 'cypress',
        url: 'http://google.com'
      })
      cy.addBlog({
        title: 'A Second blog',
        author: 'cypress',
        url: 'http://google.com'
      })
      cy.addBlog({
        title: 'A Third blog',
        author: 'cypress',
        url: 'http://google.com'
      })
    })
    it('check order', function () {
      cy.contains('A Third blog').parent().find('button').click()
      cy.get('.likesButton').click()
      cy.contains('A Third blog').parent().find('button').click()

      cy.contains('A Second blog').parent().find('button').click()
      cy.get('.likesButton')
        .parent()
        .find('button')
        .click()
        .wait(500)
        .click()
        .wait(500)
      cy.contains('A Second blog').parent().find('button').click()

      cy.get('.blog').eq(0).should('contain', 'A Second blog')
      cy.get('.blog').eq(1).should('contain', 'A Third blog')
      cy.get('.blog').eq(2).should('contain', 'A Frist blog')
    })
  })
})
