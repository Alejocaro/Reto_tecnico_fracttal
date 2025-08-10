import { addOT } from '../../support/selectors/addOT'
import LoginPage from '../pages/loginPage'
import { addTarea } from '../../support/selectors/addTarea'
import { codigoActivo } from '../../support/utils/codigoActivo'

describe('Successfully add a new order of work', () => {
    const loginPage = new LoginPage()
    Cypress.on('uncaught:exception', (err) => {
        return !err.message.includes('Cannot read properties of undefined (reading \'element\')')
    }) 
    const codigoActivoId = codigoActivo.numero_activo
    it('should add a new order of work', () => {
        loginPage.login(Cypress.env('email'), Cypress.env('password'))
        cy.wait(5000)
        cy.get(addOT.btn_menu_hamburguesa).should('be.visible').should('exist')
        cy.get(addOT.btn_menu_hamburguesa).click()
        cy.get(addTarea.btn_tareas).should('be.visible').should('exist')
        cy.get(addTarea.btn_tareas).click()
        cy.get(addOT.btn_orden_trabajo).should('be.visible').should('exist')
        cy.get(addOT.btn_orden_trabajo).click()
        cy.wait(5000)
        cy.get(addOT.txt_tablero_kanban).should('be.visible').should('exist')
        cy.get(addOT.contenedor_tarjetas_kanban).should('be.visible').should('exist')
        // Encontrar el divisor que contiene el ID del activo y hacer click en su checkbox
        cy.get('.MuiListItem-root').contains('{ ' + codigoActivoId + ' }').parent().parent().within(() => {
            cy.get('input.PrivateSwitchBase-input.css-1m9pwf3[type="checkbox"][data-indeterminate="false"]').click()
        })
        cy.get(addOT.btn_nueva_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_nueva_ot).click()
        cy.wait(5000)
        cy.get(addOT.txt_generar_nueva_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_responsable_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_responsable_ot).click()
        cy.get(addOT.btn_seleccionar_responsable_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_seleccionar_responsable_ot).click()
        cy.wait(1000)
        cy.get(addOT.seleccionar_email_responsable).should('be.visible').should('exist')
        cy.get(addOT.seleccionar_email_responsable).click()
        cy.get(addOT.btn_confirmar_responsable_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_confirmar_responsable_ot).click()
        cy.wait(1000)
        cy.get(addOT.btn_generar_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_generar_ot).click()
        cy.wait(2000)
        // Capturar el ID de la orden de trabajo generada y hacer click en él
        cy.get(addOT.seleccionar_id_ot).should('be.visible').then(($elemento) => {
            const textoCompleto = $elemento.text().trim()
            // Extraer solo el número del texto "Orden de trabajo: "
            const idOT = textoCompleto.split(':')[1].trim()
            cy.log(`ID de la OT capturado: ${idOT}`)
            // Guardar el ID en una variable de Cypress para uso posterior
            cy.wrap(idOT).as('idOrdenTrabajo')
            cy.wait(1000)
            // Hacer click en la tarjeta que contiene el ID capturado (forzar click)
            cy.get('p.MuiTypography-root.MuiTypography-body1.css-rj32oj:contains("' + idOT + '")').click({ force: true })
        })
        cy.wait(1000)
        cy.get(addOT.btn_mas).should('be.visible').should('exist')
        cy.get(addOT.btn_mas).click()
        cy.get(addOT.btn_enviar_ot_revision).should('be.visible').should('exist')
        cy.get(addOT.btn_enviar_ot_revision).click()
        cy.wait(1000)
        cy.get(addOT.btn_firma_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_firma_ot).click()
        cy.get(addOT.btn_guardar_firma_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_guardar_firma_ot).click()
        cy.wait(1000)
        // Capturar el ID de la orden de trabajo nuevamente y hacer click en él
        cy.get(addOT.seleccionar_id_ot).should('be.visible').then(($elemento) => {
            const textoCompleto = $elemento.text().trim()
            // Extraer solo el número del texto "Orden de trabajo: "
            const idOT = textoCompleto.split(':')[1].trim()
            cy.log(`ID de la OT capturado nuevamente: ${idOT}`)
            // Hacer click en la tarjeta que contiene el ID capturado (forzar click)
            cy.get('p.MuiTypography-root.MuiTypography-body1.css-rj32oj:contains("' + idOT + '")').click({ force: true })
        })
        cy.get(addOT.btn_mas).should('be.visible').should('exist')
        cy.get(addOT.btn_mas).click()
        cy.get(addOT.btn_enviar_ot_finalizadas).should('be.visible').should('exist')
        cy.get(addOT.btn_enviar_ot_finalizadas).click()
        cy.wait(5000)
        cy.get(addOT.btn_confirmar_si).should('be.visible').should('exist')
        cy.get(addOT.btn_confirmar_si).click()
        cy.get(addTarea.popup_creacion_exitosa).should('be.visible').should('exist')
        cy.log('✅ Orden de trabajo finalizada correctamente')
        cy.get(addOT.btn_cerrar).should('be.visible').should('exist')
        cy.get(addOT.btn_cerrar).click()
        cy.wait(5000)
        // Usar el ID de la OT que ya fue capturado anteriormente
        cy.get('@idOrdenTrabajo').then((idOT) => {
            cy.log(`Buscando la OT con ID: ${idOT} específicamente en la columna 'OTs Finalizadas'`)
            // Buscar primero la columna "OTs Finalizadas" y luego la tarjeta con el ID dentro de esa columna
            cy.contains('h6, h5, h4, h3, h2, h1, p, span', 'OTs Finalizadas')
                .closest('.MuiBox-root')
                .within(() => {
                    // Buscar la tarjeta que contiene el ID específicamente en esta columna
                    cy.get(`p:contains("${idOT}")`, { timeout: 10000 })
                        .should('be.visible')
                        .closest('.MuiBox-root')
                        .click({ force: true })
                    cy.log(`✅ Se hizo clic en la tarjeta de la OT: ${idOT} en la columna OTs Finalizadas`)
                })
            cy.wait(5000)
            cy.get(addOT.btn_more_vertical).should('be.visible').should('exist')
            cy.get(addOT.btn_more_vertical).click()
            cy.log('✅ Se hizo clic en el botón more_vertical para la OT: ' + idOT)
        })
        cy.get(addOT.btn_historial_ot).should('be.visible').should('exist')
        cy.get(addOT.btn_historial_ot).click()
        cy.wait(5000)
        cy.get(addOT.contenedor_jss).should('be.visible').should('exist').then(($elemento) => {
            const textoExtraido = $elemento.text().trim()
            cy.log('Texto extraído del contenedor: ' + textoExtraido)
        })
    })
})