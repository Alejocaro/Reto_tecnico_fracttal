import LoginPage from '../pages/loginPage'

describe('Login', () => {
    const loginPage = new LoginPage()

    it('Debería iniciar sesión exitosamente', () => {
        // Datos de prueba
        const email = Cypress.env('email')
        const password = Cypress.env('password')
        loginPage.login(email, password)
        // Esperar elemento estable del dashboard
        cy.get(loginPage.elements.menuButton, { timeout: 90000 })
            .should('be.visible').should('exist')
        cy.get(loginPage.elements.dashboard, { timeout: 90000 })
            .should('be.visible').should('exist')
    })

    it('Debería mostrar error con credenciales inválidas', () => {
        const email = Cypress.env('email')
        const password = 'contrasena_invalida'
        loginPage.login(email, password, false)

        // Mensaje de error alerta credenciales invalidas
        cy.get('#notistack-snackbar', { timeout: 60000 })
            .should('be.visible')
            .and('contain', 'Usuario o clave no válida')
    })
})
