describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'tester',
      username: 'test',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show login').click()
  })

  it('user can login', () => {
    cy.contains('Show login').click()
    cy.get('[name="Username"]').type('test')
    cy.get('[name="Password"]').type('test')
    cy.contains('Login').click()
    cy.contains('Add new note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show login').click()
    cy.get('[name="Username"]').type('badreq')
    cy.get('[name="Password"]').type('badreq')
    cy.contains('Login').click()
    cy.contains('Wrong username or password')
  })

  it('user can add notes', () => {
    cy.contains('Show login').click()
    cy.get('[name="Username"]').type('test')
    cy.get('[name="Password"]').type('test')
    cy.contains('Login').click()
    cy.contains('Add new note').click()
    cy.get('input:first').type('Nota de prueba con cypress')
    cy.contains('Save').click()
  })
})
