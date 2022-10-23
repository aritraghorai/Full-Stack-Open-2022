Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users/login', {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})
Cypress.Commands.add('addBlog', ({ title, url, author }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, url, author },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
    }
  })
  cy.visit('http://localhost:3000')
})
