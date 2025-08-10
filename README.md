# 🏭 Proyecto de Automatización E2E - Fracttal

---

## 📋 Tabla de Contenidos

- [🌟 Introducción](#-introducción)
- [🏢 Contexto de Negocio](#-contexto)
- [🎯 Objetivo](#-objetivo)
- [📁 Estructura del Proyecto](#-cómo-está-organizado-el-proyecto)
- [💻 Tecnologías](#-tecnologías-usadas)
- [⚙️ Configuración](#%EF%B8%8F-configuración-rápida)
- [🔧 Instalación](#-instalación-paso-a-paso)
- [🧪 Casos de Prueba](#-qué-pruebas-corremos)
- [🚀 Flujo de Ejecución](#-cómo-correr-las-pruebas)
- [📝 Criterios de Aceptación](#-criterios-de-aceptación-gherkin)
- [🏗️ Arquitectura de Pruebas](#%EF%B8%8F-cómo-está-construido-el-código)
- [📊 Reportes](#-reportes-y-resultados)
- [🔮 Resolución de Problemas](#-qué-sigue)
- [👨‍💻 Autor](#-sobre-mí)

---

## 🌟 Introducción

Fracttal es una plataforma potente para la gestión de activos y mantenimiento, y este proyecto busca automatizar con Cypress el flujo completo de mantenimiento preventivo. La idea es que, a medida que se añaden nuevas funciones, el core de mantenimiento siga funcionando sin problemas.

Aquí vamos a validar desde la creación de activos hasta cerrar órdenes de trabajo, cubriendo todo el ciclo.

---

## 🏢 Contexto

Este proyecto simula un escenario típico en Fracttal donde:  

- ✅ Se crea un activo nuevo (un refrigerador de vacunas para pruebas)
- ✅ Se asocia una tarea de mantenimiento a ese activo
- ✅ Se ejecuta una orden de trabajo basada en esa tarea
- ✅ Se sigue el ciclo completo de gestión de la orden

Esto asegura que los procesos clave funcionen bien.

---

## 🎯 Objetivo

El reto es demostrar habilidades para:

- 📋 Documentar criterios claros para cada prueba
- 🔧 Resolver errores que puedan surgir durante la automatización
- 🤖 Utilizar herramientas modernas, incluso IA, para hacer el flujo más eficiente
- 📊 Generar reportes que den evidencia clara de los resultados

---

## 📁 Cómo está organizado el proyecto

```
Reto_fracttal/
├── cypress/
│   ├── downloads/              
│   ├── e2e/                    
│   │   ├── auth/               # Login y autenticación
│   │   ├── createActive/       # Activos, tareas y órdenes
│   │   └── pages/              # Page Objects
│   ├── fixtures/               
│   ├── screenshots/            
│   ├── support/                
│   │   ├── commands.js         # Comandos personalizados
│   │   ├── e2e.js              
│   │   ├── selectors/          # Selectores organizados por módulo
│   │   └── utils/              # Utilidades como generación de códigos
├── cypress.config.js           
├── package.json                
├── README.md                   
```

---

## 💻 Tecnologías usadas

| Tecnología | Versión | Para qué sirve |
|------------|---------|----------------|
| Cypress | ^14.5.4 | Framework de testing E2E |
| Node.js | >=16.x | Entorno de ejecución JS |
| dotenv | ^17.2.1 | Variables de entorno |
| cypress-mochawesome-reporter | ^3.8.2 | Generación de reportes HTML |
| mochawesome | ^7.1.3 | Reporter base para Mocha |
| mochawesome-merge | ^4.3.0 | Consolidación de reportes |
| mochawesome-report-generator | ^6.2.0 | Generador de reportes finales |
| rimraf | ^6.0.1 | Limpieza de archivos |
| JavaScript ES6+ | - | Lenguaje principal |

---

## ⚙️ Configuración rápida

- 🌐 Base URL apuntando a https://one.fracttal.com
- 🔐 Variables de entorno para el usuario y contraseña (se pueden configurar en .env)
- 🧪 Especificación de tests que se van a correr
- 🖥️ Resolución estándar de 1920x1080

---

## 🔧 Instalación paso a paso

```bash
# Clonar el repo
git clone <URL_DEL_REPOSITORIO>
cd Reto_fracttal

# Instalar dependencias
npm install

# (Opcional) Crear archivo .env con tus credenciales
echo "proporcionadas por fracttal" > .env
echo "proporcionadas por fracttal*" >> .env

# Verificar que Cypress está listo
npx cypress verify
```

---

## 🧪 Qué pruebas corremos

### 1. 🔐 Login
Validamos que el login funcione bien con credenciales válidas y que muestre error con credenciales incorrectas.

### 2. 🏭 Creación de activo
Creamos un equipo llamado "REFRIGERADOR DE VACUNAS Equipo QA" con un código único.

### 3. 📋 Gestión de tareas
Creamos un plan y tareas de mantenimiento, configuramos el tiempo de paro, activadores y vinculamos el activo.

### 4. 🔄 Órdenes de trabajo
Generamos la orden desde la tarea, la asignamos, la revisamos, la firmamos y la finalizamos, validando cada paso.

---

## 📝 Criterios de Aceptación (Gherkin)

### 🔐 Feature: Autenticación

```gherkin
Feature: Autenticación en Fracttal
  Como usuario del sistema Fracttal
  Quiero poder autenticarme correctamente
  Para acceder a las funcionalidades del sistema

  Scenario: Login exitoso con credenciales válidas
    Given que estoy en la página de login de Fracttal
    When ingreso el email "testersqa2@gmail.com"
    And ingreso la contraseña "TesterFracttal2025.*"
    And hago clic en el botón "Siguiente"
    Then debería ser redirigido al dashboard
    And debería ver el texto "Dashboard"

  Scenario: Login fallido con credenciales inválidas
    Given que estoy en la página de login de Fracttal
    When ingreso el email "testersqa2@gmail.com"
    And ingreso una contraseña incorrecta
    And hago clic en el botón "Siguiente"
    Then debería ver el mensaje "Usuario o clave no válida"
```

### 🏭 Feature: Gestión de Activos

```gherkin
Feature: Creación de Activos
  Como usuario del sistema
  Quiero crear un nuevo activo tipo equipo
  Para poder gestionar su mantenimiento

  Scenario: Crear activo tipo REFRIGERADOR DE VACUNAS
    Given que estoy autenticado en el sistema
    When navego al módulo "Catálogos" > "Activos"
    And selecciono el tipo "Equipos"
    And hago clic en "Agregar"
    And ingreso el nombre "REFRIGERADOR DE VACUNAS Equipo QA"
    And ingreso un código único generado automáticamente
    And hago clic en "Guardar"
    Then debería ver el mensaje "Proceso Realizado"
    And el activo debería aparecer en la tabla de equipos
```

### 📋 Feature: Gestión de Tareas

```gherkin
Feature: Creación de Tareas de Mantenimiento
  Como usuario del sistema
  Quiero crear una tarea de mantenimiento preventivo
  Para poder programar el mantenimiento de activos

  Background:
    Given que estoy autenticado en el sistema
    And existe un activo "REFRIGERADOR DE VACUNAS Equipo QA"

  Scenario: Crear plan de tareas de mantenimiento
    When navego al módulo "Tareas" > "Plan de Tareas"
    And hago clic en "Agregar"
    And ingreso la descripción "Mantenimiento Preventivo"
    And hago clic en "Guardar"
    Then debería ver el mensaje "Proceso Realizado"

  Scenario: Crear tarea específica
    Given que existe un plan de tareas "Mantenimiento Preventivo"
    When accedo a la sección "Tareas"
    And hago clic en "Agregar tarea"
    And ingreso la descripción "Verificar temperatura interna y ajustar termostato si es necesario"
    And selecciono el tipo "Mantenimiento"
    And configuro el tiempo de paro en "30" minutos
    And agrego un activador de tipo "Fecha"
    And hago clic en "Guardar"
    Then debería ver el mensaje "Proceso Realizado"
    And la tarea debería aparecer en la tabla

  Scenario: Vincular activo a la tarea
    Given que existe una tarea de mantenimiento
    When accedo a "Activos Vinculados"
    And hago clic en "Agregar activos vinculados"
    And busco el activo por su código
    And selecciono el activo "REFRIGERADOR DE VACUNAS Equipo QA"
    And hago clic en "Vincular Activos e Iniciar tareas"
    Then debería ver el mensaje "Proceso Realizado"
    And el activo debería estar vinculado a la tarea
```

### 🔄 Feature: Gestión de Órdenes de Trabajo

```gherkin
Feature: Gestión completa de Órdenes de Trabajo
  Como usuario del sistema
  Quiero gestionar el ciclo completo de una orden de trabajo
  Para completar el mantenimiento preventivo

  Background:
    Given que estoy autenticado en el sistema
    And existe un activo vinculado a una tarea de mantenimiento
    And la tarea tiene un activador de fecha configurado

  Scenario: Generar orden de trabajo desde tarea
    When navego al módulo "Tareas" > "Órdenes de Trabajo"
    And veo el tablero Kanban
    And selecciono el activo con su código único
    And hago clic en "Nueva OT"
    And asigno el responsable "testersqa2@gmail.com"
    And hago clic en "Generar OT"
    Then debería ver la orden de trabajo generada
    And debería capturar el ID de la OT

  Scenario: Procesar orden de trabajo - Enviar a revisión
    Given que existe una OT generada
    When hago clic en la tarjeta de la OT
    And hago clic en "Más"
    And selecciono "Enviar a OTs en Revisión"
    And firmo digitalmente la orden
    And hago clic en "Guardar"
    Then la OT debería cambiar de estado a "En Revisión"

  Scenario: Finalizar orden de trabajo
    Given que existe una OT en revisión
    When hago clic en la tarjeta de la OT
    And hago clic en "Más"
    And selecciono "Enviar a OTs Finalizadas"
    And confirmo la acción haciendo clic en "Sí"
    Then debería ver el mensaje "Proceso Realizado"
    And la OT debería aparecer en la columna "OTs Finalizadas"

  Scenario: Validar histórico de la orden
    Given que existe una OT finalizada
    When hago clic en la tarjeta de la OT finalizada
    And hago clic en "Más"
    And selecciono "Historial de la OT"
    Then debería ver el histórico completo
    And debería ver el estado "(Finalizadas)" en el timeline
```

---

## 🏗️ Cómo está construido el código

Usamos **Page Object Model** para mantener el código limpio y fácil de mantener. Los selectores están organizados por funcionalidad y tenemos utilidades para cosas como generar códigos únicos.

---

## 🚀 Cómo correr las pruebas

### Modo interactivo para desarrollo:
```bash
npm run cypress:open
```

### Modo headless para integración continua o ejecución rápida:
```bash
npm run cypress:run
```

---

## 📊 Reportes y resultados

### 📈 Reportes HTML Automatizados

El proyecto ahora incluye reportes HTML detallados con **Mochawesome** que incluyen:

- 📊 **Dashboards interactivos** con gráficos y estadísticas
- 🎥 **Videos** de cada prueba ejecutada
- 📸 **Screenshots** automáticos en fallos y pasos importantes
- 📋 **Detalles completos** de cada test con tiempos de ejecución
- 📱 **Diseño responsive** para ver reportes en cualquier dispositivo

### 🚀 Comandos para generar reportes:

```bash
# Ejecutar pruebas con reporte HTML
npm run test:report

# Ejecutar en modo headed (ver navegador) con reportes
npm run test:report:headed

# Generar reporte completo consolidado
npm run test:full

# Limpiar reportes anteriores
npm run clean:reports
```

### 📁 Ubicación de reportes:

- **📊 Reportes HTML:** `cypress/reports/`
- **🎥 Videos:** `cypress/reports/videos/`
- **📸 Screenshots:** `cypress/reports/screenshots/`

### 📋 Información adicional:

- 🎥 Cypress genera videos y capturas si hay fallos
- 📝 En consola se ven logs claros con el estado de cada paso
- ✅ Todos los tests deben pasar para considerarlo exitoso
- 📊 Los reportes HTML se generan automáticamente después de cada ejecución

### 🤖 Nota: Uso de Cursor (IA) en el desarrollo

Para transparencia, durante el desarrollo se utilizó el editor Cursor con asistencia de IA para:
- Autocompletado y aceleración en la escritura de pruebas y Page Objects
- Implementación y manejo de `localStorage` en los flujos de autenticación (p. ej., preservar sesión/token entre tests)
- Sugerencias de refactorización y organización de `selectors`, `commands` y utilidades
- Apoyo en configuración de reportes y scripts de `npm`
- Se utilo para implementacion de manejo de errores en cypress
- // Leer el fixture y preparar alias para el código del activo
        cy.readFile('cypress/fixtures/codigo_activo.json').then(({ codigo }) => {
            cy.wrap(String(codigo)).as('codigoActivo')
        })
- Además, se empleó para realizar la refactorización del código y mejorar su calidad, siguiendo principios de código    limpio. 
- Se utilizo para la contruccion del mismo documento README.md

---

## 🔮 Qué sigue

- 🔄 Integrar con CI/CD (GitHub Actions)
- 📈 Dashboard con métricas de pruebas y rendimiento
- 🧪 Más pruebas: API, performance, accesibilidad

---

## 👨‍💻 Sobre mí

**Alejandro Caro** - Automation QA Engineer

📧 **Email:** alejandrocaro255437@correo.itm.edu.co  
💼 **LinkedIn:** https://www.linkedin.com/in/alejandrocarogomez/  
🐙 **GitHub:** https://github.com/Alejocaro

---

## 📄 Licencia

**Licencia ISC**  
© 2025 - Proyecto de Automatización E2E para Fracttal