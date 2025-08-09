import './commands'
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('t.$_Tawk.i18next is not a function')) {
    return false; 
  }
  return true;
});