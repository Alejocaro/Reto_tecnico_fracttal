import loginPage from '../e2e/pages/loginPage'

Cypress.Commands.add('loginAdmin', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    
    loginPage.login(email, password)
})

