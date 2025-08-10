const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  viewportWidth: 1920 ,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://one.fracttal.com',
    setupNodeEvents(on, config) {
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
  },
});