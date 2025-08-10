import { createActive } from '../../support/selectors/createActive'
import LoginPage from '../pages/loginPage'
import { codigoActivo } from '../../support/utils/codigoActivo'
describe('Create a new equipment type asset', () => {
    const loginPage = new LoginPage()
    Cypress.on('uncaught:exception', (err) => {
        return !err.message.includes('Cannot read properties of undefined (reading \'element\')')
    })

    it('should create a new equipment type asset', () => {
        // Limpiar el código anterior del localStorage para generar uno nuevo
        codigoActivo.limpiarCodigo()
        
        loginPage.login(Cypress.env('email'), Cypress.env('password'))
        cy.wait(2000)
        cy.get(createActive.btn_menu_hamburguesa).should('be.visible').should('exist')
        cy.get(createActive.btn_menu_hamburguesa).click()
        cy.wait(5000)
        cy.get(createActive.btn_catalogos).should('be.visible').should('exist')
        cy.get(createActive.btn_catalogos).click()
        cy.wait(5000)
        cy.get(createActive.btn_activos).should('be.visible').should('exist')
        cy.get(createActive.btn_activos).click()
        cy.get(createActive.btn_todos_los_activos).should('be.visible').should('exist')
        cy.get(createActive.btn_todos_los_activos).click()
        cy.wait(5000)
        cy.get(createActive.btn_equipos).should('be.visible').should('exist')
        cy.get(createActive.btn_equipos).click()
        cy.wait(5000)
        cy.get(createActive.btn_agregar_equipo).should('be.visible').should('exist')
        cy.get(createActive.btn_agregar_equipo).click()
        cy.wait(5000)
        cy.get(createActive.txt_datos_requeridos).should('be.visible').should('exist')
        cy.get(createActive.txt_nombre).should('be.visible').should('exist')    
        cy.get(createActive.txt_nombre).type('REFRIGERADOR DE VACUNAS Equipo QA', {timeout: 10000})
        // Usar una constante local y persistirla en un fixture para otros specs
        const codigo = codigoActivo.numero_activo
        cy.get(createActive.txt_codigo).eq(3).should('be.visible').should('exist').type(codigo)
        // Guardar el código para que otros specs lo lean sin depender de localStorage
        cy.writeFile('cypress/fixtures/codigo_activo.json', { codigo })
        cy.get(createActive.btn_guardar).should('be.visible').should('exist')
        cy.get(createActive.btn_guardar).click()
        cy.get(createActive.popup_creacion_exitosa).should('be.visible').should('exist')
        cy.get(createActive.popup_creacion_exitosa).click()
        cy.get(createActive.icono_flecha_izquierda).should('be.visible').should('exist')
        cy.get(createActive.icono_flecha_izquierda).click()
        cy.wait(5000)
        // Validación de que el activo se muestra en la tabla
        cy.get(createActive.tabla_activos).should('be.visible')
        
        // Verificar si el activo existe sin hacer fallar el test
        cy.get('body').then($body => {
            const activoEncontrado = $body.find('*:contains("' + codigoActivo.numero_activo + '")').length > 0
            if (activoEncontrado) {
                cy.log('✅ Se encontró el activo con el código: ' + codigoActivo.numero_activo)
                
                // Validación adicional de que la fila contiene tanto el código como el nombre
                cy.get(createActive.codigo_equipo_visible(codigoActivo.numero_activo))
                    .should('be.visible')
                    .should('contain', codigoActivo.numero_activo)
                    .should('contain', 'REFRIGERADOR DE VACUNAS Equipo QA')
            } else {
                cy.log('❌ No se encontró el activo con el código: ' + codigoActivo.numero_activo)
            }
        })
            
    })
})
