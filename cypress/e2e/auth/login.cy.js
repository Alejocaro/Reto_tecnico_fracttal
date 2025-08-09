import LoginPage from '../pages/loginPage'

describe('Login', () => {
    const loginPage = new LoginPage()

    it('Debería iniciar sesión exitosamente', () => {
        // Datos de prueba
        const email = Cypress.env('email')
        const password = Cypress.env('password')
        loginPage.login(email, password)
        cy.url().should('not.include', '/signin')

        // Verificar que el dashboard sea visible
        cy.get(loginPage.elements.dashboard)
            .should('be.visible').should('exist')
    })

    it('Debería mostrar error con credenciales inválidas', () => {
        const email = Cypress.env('email')
        const password = 'contrasena_invalida'
        loginPage.login(email, password)

        // Mensaje de error alerta credenciales invalidas
        cy.get('#notistack-snackbar')
            .should('be.visible')
            .and('contain', 'Usuario o clave no válida')
    })
})
