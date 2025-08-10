export const addOT = {
    btn_menu_hamburguesa: 'button.qa-main-menu-btn',
    btn_orden_trabajo: 'li[role="menuitem"]:contains("Órdenes de Trabajo")',
    txt_tablero_kanban: 'h1.MuiTypography-root.MuiTypography-subtitle1.css-yu03l4:contains("Kanban")',
    
    // Selectores para validar tareas en el tablero Kanban
    contenedor_tarjetas_kanban: '.qa-card-kanban',
    tarjeta_tarea: '.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.jss457',
    activo_tarea: '.jss465 .jss468',
    nombre_tarea: '.jss464 .jss467',
    checkbox_tarea: '.MuiCheckbox-root input[type="checkbox"]',
    prioridad_tarea: '.MuiBox-root.css-f35014 svg[data-info="priority_medium"]',
    tiempo_tarea: '.jss463 .css-l983eo',
    fecha_tarea: '.jss463 .css-1ydbnb5',
    frecuencia_tarea: '.jss462 .jss470',
    btn_reprogramar: '.qa-reschedule-task',

    // Selectores específicos para validar contenido de texto
    validar_activo: (nombreActivo) => `.jss468:contains("${nombreActivo}")`,
    validar_tarea: (nombreTarea) => `.jss467:contains("${nombreTarea}")`,
    validar_fecha: (fecha) => `.css-1ydbnb5:contains("${fecha}")`,
    validar_frecuencia: (frecuencia) => `.jss470:contains("${frecuencia}")`,

    // Selector específico para OT en proceso con ID dinámico
    activo_ot_con_id: '.jss425 .jss422',
    validar_activo_con_id: (nombreActivo, id) => `.jss422:contains("${nombreActivo}"):contains("{ ${id} }")`,
    validar_activo_por_id: (id) => `.jss422:contains("{ ${id} }")`,

    checkbox_tarea: 'input.PrivateSwitchBase-input.css-1m9pwf3[type="checkbox"][data-indeterminate="false"]',
    btn_nueva_ot: 'button.qa-new-wo-btn[aria-label="Nueva OT"]',
    txt_generar_nueva_ot: 'p.MuiTypography-root.MuiTypography-body1.css-rj32oj',
    btn_responsable_ot:'input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd[readonly][required][aria-invalid]',
    btn_seleccionar_responsable_ot: 'button.MuiIconButton-root[aria-label="toggle password visibility"]',
    seleccionar_email_responsable: 'div.MuiTableCell-root:contains("testersqa2@gmail.com")',
    btn_confirmar_responsable_ot: 'button.qa-tbn-save.icon_button[aria-label="Aceptar"]',
    btn_personal_ot: 'input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedStart.MuiInputBase-inputAdornedEnd[readonly][required][aria-invalid="true"]',
    btn_generar_ot: 'button.qa-save-btn[aria-label="Generar OT"]',
    
    capturar_id_ot:'button.qa-wo-print-btn[aria-label="Imprimir"]',
    seleccionar_id_ot:'p.MuiTypography-root.MuiTypography-body2.css-1i31s30',
    btn_mas:'button.qa-wo-options[aria-label="Más"]',
    btn_enviar_ot_revision:'li.MuiMenuItem-root:contains("Enviar a OTs en Revisión")',
    btn_firma_ot:'canvas[data-testid="canvas-element"]',
    btn_guardar_firma_ot:'button.qa-save-btn.qa-signature-save-btn.icon_button',
    popup_creacion_exitosa: 'div[role="alert"] #notistack-snackbar:contains("Proceso Realizado")',
    btn_atras_ot: 'button.qa-back-btn.icon_button',
    btn_enviar_ot_finalizadas:'li.MuiMenuItem-root:contains("Enviar a OTs Finalizadas")',
    btn_confirmar_si: 'button.qa-action-yes',
    btn_more_vertical: 'button.qa-wo-options[aria-label="Más"]',
    btn_historial_ot: 'span.MuiTypography-root.MuiListItemText-primary:contains("Historial de la OT")',
    contenedor_jss: 'div.MuiTimelineContent-root:contains("(Finalizadas)")',
    btn_cerrar: 'svg[data-info="close"]',
    

    
   
    






    popup_nota_exitosa: 'div[role="alert"] #notistack-snackbar:contains("Proceso Realizado")'

}