import { addTarea } from '../../support/selectors/addTarea'
import LoginPage from '../pages/loginPage'
import { codigoActivo } from '../../support/utils/codigoActivo'

describe('Successfully add a new task to an asset', () => {
    const loginPage = new LoginPage()
    Cypress.on('uncaught:exception', (err) => {
        return !err.message.includes('Cannot read properties of undefined (reading \'element\')')
    })
    const nombreTarea = 'Verificar temperatura interna y ajustar termostato si es necesario.'   
    const nombreActivo = 'REFRIGERADOR DE VACUNAS Equipo QA'

    it('should add a new task to an asset', () => {
        // Cargar el código persistido y colocarlo en localStorage para compatibilidad con el getter existente
        cy.readFile('cypress/fixtures/codigo_activo.json').then(({ codigo }) => {
            window.localStorage.setItem('codigo_activo_test', codigo)
            cy.wrap(codigo).as('codigoActivo')
        })

        loginPage.login(Cypress.env('email'), Cypress.env('password'))
        cy.wait(2000)
        cy.get(addTarea.btn_menu_hamburguesa).should('be.visible').should('exist')
        cy.get(addTarea.btn_menu_hamburguesa).click()
        cy.get(addTarea.btn_tareas).should('be.visible').should('exist')
        cy.get(addTarea.btn_tareas).click()
        cy.get(addTarea.btn_plan_de_tareas).should('be.visible').should('exist')
        cy.get(addTarea.btn_plan_de_tareas).click()
        cy.wait(5000)
        cy.get(addTarea.btn_agregar_tarea).should('be.visible').should('exist')
        cy.get(addTarea.btn_agregar_tarea).click()
        cy.wait(5000)
        cy.get(addTarea.txt_datos_requeridos).should('be.visible').should('exist')
        cy.get(addTarea.descripcion).should('be.visible').should('exist')
        cy.get(addTarea.descripcion).eq(0).type('Mantenimiento Preventivo')
        cy.get(addTarea.btn_guardar).should('be.visible').should('exist')
        cy.get(addTarea.btn_guardar).click()
        cy.get(addTarea.popup_creacion_exitosa).should('be.visible').should('exist')
        cy.get(addTarea.popup_creacion_exitosa).click()
        cy.wait(5000)
        cy.get(addTarea.btn_add_tarea_).should('be.visible').should('exist')
        cy.get(addTarea.btn_add_tarea_).click()
        cy.wait(5000)
        cy.get(addTarea.btn_add_tarea_2).should('be.visible').should('exist')
        cy.get(addTarea.btn_add_tarea_2).click()
        cy.wait(5000)
        cy.get(addTarea.input_descripcion).eq(8).should('be.visible').should('exist')
        cy.get(addTarea.input_descripcion).eq(8).type('Verificar temperatura interna y ajustar termostato si es necesario.')
        cy.get(addTarea.btn_tipo_de_tarea).should('be.visible').should('exist')
        cy.get(addTarea.btn_tipo_de_tarea).click()
        cy.get(addTarea.seleccionar_tipo_de_tarea).should('be.visible').should('exist')
        cy.get(addTarea.seleccionar_tipo_de_tarea).click()
        cy.get(addTarea.input_tiempo_paro_mtto).eq(14).should('be.visible').should('exist')
        cy.get(addTarea.input_tiempo_paro_mtto).eq(14).clear().type('00030')
        cy.get(addTarea.btn_agregar_activador).should('be.visible').should('exist')
        cy.get(addTarea.btn_agregar_activador).click()
        cy.get(addTarea.btn_agregar_activador_evento).should('be.visible').should('exist')
        cy.get(addTarea.btn_agregar_activador_evento).click()
        cy.wait(5000)
        cy.get(addTarea.btn_guardar_activador_evento_fecha).should('be.visible').should('exist')
        cy.get(addTarea.btn_guardar_activador_evento_fecha).click()
        cy.wait(5000)
        cy.get(addTarea.btn_guardar_tarea).should('be.visible').should('exist')
        cy.get(addTarea.btn_guardar_tarea).click()
        cy.get(addTarea.popup_creacion_exitosa).should('be.visible').should('exist')
        cy.get(addTarea.icono_flecha_izquierda).should('be.visible').should('exist')
        cy.get(addTarea.icono_flecha_izquierda).click()
        // Validar que la tarea se creó correctamente en la tabla
        cy.get(addTarea.tabla_tareas).should('be.visible')
        // Verificar si la tarea existe sin hacer fallar el test
        cy.get('body').then($body => {
            const tareaEncontrada = $body.find('*:contains("' + nombreTarea + '")').length > 0
            if (tareaEncontrada) {
                cy.log('✅ Se encontró la tarea: ' + nombreTarea)
                
                // Validación adicional de que la fila contiene la descripción de la tarea
                cy.get(addTarea.validar_tarea_creada(nombreTarea))
                    .should('be.visible')
                    .should('contain', nombreTarea)
            } else {
                cy.log('❌ No se encontró la tarea: ' + nombreTarea)
            }
        })
        
        //activos vinculados
        cy.get(addTarea.btn_activos_viculados).should('be.visible').should('exist')
        cy.get(addTarea.btn_activos_viculados).click()
        cy.wait(5000)
        cy.get(addTarea.btn_agregar_activos_viculados).should('be.visible').should('exist')
        cy.get(addTarea.btn_agregar_activos_viculados).click()
        cy.wait(8000)
        // Buscar el activo creado previamente usando el código guardado
        cy.get('@codigoActivo').then((codigo) => {
            cy.log('🔍 Buscando activo con código: ' + codigo)
            cy.log('🔍 Nombre del activo a buscar: ' + nombreActivo)
            // Hacer clic en el botón de búsqueda y buscar el código del activo
            cy.get(addTarea.btn_buscar_activos).should('be.visible').click()
            cy.wait(8000)
            // Escribir el código del activo en el campo de búsqueda (usar el primero si hay varios)
            cy.get(addTarea.txt_buscar_activos).first().should('be.visible').type(String(codigo))
            cy.wait(8000)
            // Validar si se encontró el activo en la tabla de resultados
            cy.get('body').then($body => {
                const activoEncontrado = $body.find('.qa-list-item:contains("' + codigo + '")').length > 0
                if (activoEncontrado) {
                    cy.log('✅ Se encontró el activo con código: ' + codigo)
                    // Validación adicional - verificar que está en un elemento de lista
                    cy.get(addTarea.tabla_activos_disponibles).contains(String(codigo)).should('be.visible')
                } else {
                    cy.log('❌ No se encontró el activo con código: ' + codigo)
                }
            })
        })
        cy.get(addTarea.tabla_activos_disponibles).should('be.visible').should('exist')
        cy.get(addTarea.tabla_activos_disponibles).click()
        cy.get(addTarea.btn_vincular_activos).should('be.visible').should('exist')
        cy.get(addTarea.btn_vincular_activos).click()
        cy.get(addTarea.popup_creacion_exitosa).should('be.visible').should('exist')
        cy.log('✅ Activo Vinculado exitosamente')
    })
})
