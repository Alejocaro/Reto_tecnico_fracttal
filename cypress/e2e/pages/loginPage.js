class LoginPage {
    elements = {
            email: 'input[name="email"]',
            password: 'input[name="password"]',
            loginButton: '[data-cy="next-button"]',
            dashboard: 'h1:contains("Dashboard")',
        }
        
    visit() {
        cy.visit('/signin')
        // Evitar esperas fijas; esperar a que el DOM esté listo y el campo de email aparezca
        cy.get(this.elements.email, { timeout: 60000 }).should('be.visible')
    }
    
    handleVueError() {
        cy.on('uncaught:exception', (err) => {
            return !err.message.includes('Cannot read properties of undefined (reading \'element\')')
        })
    }

    login(email, password, shouldWaitForRedirect = true) {
        // Validar que los parámetros no sean undefined
        if (!email || !password) {
            throw new Error('Email y password son requeridos y no pueden ser undefined')
        }
        
        this.visit()
        this.handleVueError()
        
        // Esperar a que la página se cargue completamente
        cy.get('body', { timeout: 60000 }).should('be.visible')
        
        cy.get(this.elements.email, { timeout: 60000 })
            .should('be.visible')
            .should('be.enabled')
            .clear()
            .type(email, { delay: 50 })
        
        cy.get(this.elements.password, { timeout: 60000 })
            .should('be.visible')
            .should('be.enabled')
            .clear()
            .type(password, { delay: 50 })
        
        cy.get(this.elements.loginButton, { timeout: 60000 })
            .should('be.visible')
            .should('be.enabled')
            .should('contain', 'Siguiente')
            .click()

        if (shouldWaitForRedirect) {
            // Esperar a que la URL cambie y ya no esté en /signin
            cy.url({ timeout: 60000 }).should('not.include', '/signin')
        }
    }
}
export default LoginPage;
