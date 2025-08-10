const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://one.fracttal.com',
    setupNodeEvents(on, config) {
      // Configurar cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      
      config.env = {
        email: process.env.email || 'testersqa2@gmail.com', 
        password: process.env.password || 'TesterFracttal2025.*',
      }
         
      return config;
    },
    specPattern: [
      "cypress/e2e/auth/Login.cy.js",
      "cypress/e2e/createActive/createActive.cy.js",
      "cypress/e2e/createActive/addTarea.cy.js",
      "cypress/e2e/createActive/addOrdenTrabajo.cy.js",
    ],
    testIsolation: false,
    experimentalSessionAndOrigin: true,
    // Configuración específica para localStorage en headless
    chromeWebSecurity: false,
    // Asegurar que el navegador mantenga el estado
    defaultCommandTimeout: 60000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    pageLoadTimeout: 120000,
    // Configuración para reportes HTML
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Reporte de Pruebas Fracttal',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportFilename: 'reporte-fracttal-[datetime]',
      timestamp: 'longDate',
      showPassed: true,
      showFailed: true,
      showPending: true,
      showSkipped: true,
    },
    // Configuración para videos y screenshots
    video: true,
    videosFolder: 'cypress/reports/videos',
    videoCompression: 32,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/reports/screenshots',
    // Capturar screenshots en cada paso
    screenshotOptions: {
      capture: 'viewport',
      scale: false,
      disableTimersAndAnimations: false,
      blackout: [],
      overwrite: false,
    },
  },
});