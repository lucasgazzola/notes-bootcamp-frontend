describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show login').click()
  })

  it('user can login', () => {
    cy.contains('Show login').click()
    cy.get('[name="Username"]').type('lucas')
    cy.get('[name="Password"]').type('lucas')
    cy.contains('Login').click()
  })

  it('user can add notes', () => {
    cy.contains('Show login').click()
    cy.get('[name="Username"]').type('lucas')
    cy.get('[name="Password"]').type('lucas')
    cy.contains('Login').click()
    cy.contains('Add new note').click()
    cy.get('input:first').type('Nota de prueba con cypress')
    cy.contains('Save').click()
  })
})
