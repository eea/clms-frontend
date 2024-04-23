// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import products from '../fixtures/products.json';
import wo from '../fixtures/work-opportunities.json';
import faq from '../fixtures/faq.json';

// Alternatively you can use CommonJS syntax:
// require('./commands')

/* coverage-start
//Generate code-coverage
import '@cypress/code-coverage/support';
coverage-end */

export const setupBeforeEach = () => {
  cy.autologin();
  cy.visit('/en');
  // cy.waitForResourceToLoad('@navigation');
  // cy.waitForResourceToLoad('@breadcrumbs');
  // cy.waitForResourceToLoad('@actions');
  // cy.waitForResourceToLoad('@types');
  cy.createContentJSON({ contentJSON: products, path: 'en' });
  cy.setWorkflow({ path: `en/${products.id}` });
  cy.createContentJSON({ contentJSON: wo, path: 'en' });
  cy.setWorkflow({ path: `en/${wo.id}` });
  cy.createContentJSON({ contentJSON: faq, path: 'en' });
  cy.setWorkflow({ path: `en/${faq.id}` });
  // cy.waitForResourceToLoad('my-page');
  // cy.navigate('/my-page/edit');
  // cy.get(`.block.title [data-contents]`);
  // cy.navigate('/my-page');
};

export const tearDownAfterEach = () => {
  cy.autologin();
  cy.removeContent(`en/${products.id}`);
  cy.removeContent(`en/${wo.id}`);
  cy.removeContent(`en/${faq.id}`);
};
