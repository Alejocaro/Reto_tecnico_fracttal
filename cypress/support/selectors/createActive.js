export const createActive = {   
    btn_menu_hamburguesa: 'button.qa-main-menu-btn',
    btn_catalogos: '.MuiListItem-root.qa-item-menu-sidebar[role="button"]:contains("Catálogos")',
    btn_activos: 'li.qa-assets[role="menuitem"]:contains("Activos")',
    btn_todos_los_activos: 'button[aria-label="Todos los Activos"]',
    btn_equipos: 'li[role="menuitem"][value="3"]:contains("Equipos")',	
    btn_agregar_equipo: 'button[aria-label="Agregar"]',
    txt_datos_requeridos: '.qa-alert-error',
    txt_nombre: 'input[aria-describedby*="helper-text"]:first',
    txt_codigo: 'input',
    btn_guardar: 'div.MuiBox-root:contains("Guardar")',
    popup_creacion_exitosa: 'div[role="alert"] #notistack-snackbar:contains("Proceso Realizado")',
    icono_flecha_izquierda: 'svg[data-info="full_arrow_left"]',
    // Selectores para validar la tabla
    tabla_activos: '.MuiTableRow-root',
    nombre_equipo_visible: (nombre) => `.MuiTableRow-root:contains("${nombre}")`,
    codigo_equipo_visible: (codigo) => `.MuiTableRow-root:contains("${codigo}")`,

}
