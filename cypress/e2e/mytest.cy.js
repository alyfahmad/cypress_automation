describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.title().should('eq','OrangeHRM')
  })

  it('passes', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.title().should('eq','RedHRM')
  })
  
})