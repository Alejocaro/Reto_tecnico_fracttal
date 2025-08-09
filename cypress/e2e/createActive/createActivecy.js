import { createActive } from '../../support/selectors/createActive'
import LoginPage from '../pages/loginPage'

describe('Create a new equipment type asset', () => {
    const loginPage = new LoginPage()
    Cypress.on('uncaught:exception', (err) => {
        return !err.message.includes('Cannot read properties of undefined (reading \'element\')')
    })

    it('should create a new equipment type asset', () => {
        loginPage.login(Cypress.env('email'), Cypress.env('password'))
        cy.wait(2000)
        cy.get(createActive.menu_hamburguesa).should('be.visible').should('exist').click()
        cy.get(createActive.catalogos).should('be.visible').should('exist').click()
        cy.get(createActive.activos).should('be.visible').should('exist').click()
        cy.get(createActive.todos_los_activos).should('be.visible').should('exist').click()
        cy.get(createActive.equipos).should('be.visible').should('exist').click()


    })
})
