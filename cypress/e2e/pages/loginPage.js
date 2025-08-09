class LoginPage {
    elements = {
            email: 'input[name="email"]',
            password: 'input[name="password"]',
            loginButton: '[data-cy="next-button"]',
            dashboard: 'h1:contains("Dashboard")',
        }
        
    visit() {
        cy.visit('/signin')
        cy.wait(15000)
    }
    
    handleVueError() {
        cy.on('uncaught:exception', (err) => {
            return !err.message.includes('Cannot read properties of undefined (reading \'element\')')
        })
    }

    login(email, password, dashboard = false) {
        // Validar que los parámetros no sean undefined
        if (!email || !password) {
            throw new Error('Email y password son requeridos y no pueden ser undefined')
        }
        
        this.visit()
        this.handleVueError()
        
        // Esperar a que la página se cargue completamente
        cy.get('body', { timeout: 10000 }).should('be.visible')
        
        cy.get(this.elements.email, { timeout: 10000 })
            .should('be.visible')
            .should('be.enabled')
            .clear()
            .type(email, { delay: 100 })
        
        cy.get(this.elements.password, { timeout: 10000 })
            .should('be.visible')
            .should('be.enabled')
            .clear()
            .type(password, { delay: 100 })
        
        cy.get(this.elements.loginButton, { timeout: 10000 })
            .should('be.visible')
            .should('be.enabled')
            .should('contain', 'Siguiente')
            .click()

        if (dashboard) {
            cy.url({ timeout: 15000 }).should('not.include', '/signin')
        }
    }
}
export default LoginPage;
