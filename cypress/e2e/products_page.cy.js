import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';
import pr from '../fixtures/products.json';
import clc from '../fixtures/products/corine-land-cover.json';
import gdlc from '../fixtures/products/global-dynamic-land-cover.json';

describe('Products Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);
  var products = [
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
  ];

  it('Products Page: testing tabs', () => {
    cy.navigate(`/en/${pr.id}`);
    cy.wait(500);
    cy.scrollTo('top');
    cy.get('.left-menu .card.subcard.active a').should(
      'contain',
      'Get overview',
    );
    cy.get('.left-menu .card.subcard a').contains('Explore').click();
    cy.wait(500);
    cy.scrollTo('top');
    cy.get('.left-menu .card.subcard.active a').should('contain', 'Explore');
    cy.url().should(
      'eq',
      Cypress.config().baseUrl + `/en/${pr.id}?tab=explore`,
    );
    cy.get('.left-menu .card a').contains('What is coming?').click();
    cy.scrollTo('top');
    cy.get('.left-menu .card.active a').should('contain', 'What is coming?');
    cy.url().should(
      'eq',
      Cypress.config().baseUrl + `/en/${pr.id}?tab=what_is_coming`,
    );
    // Change page title
    // cy.get('.page-title > .public-DraftStyleDefault-block')
    //   .clear()
    //   .type('My Add-on Page')
    //   .get('.page-title span[data-text]')
    //   .contains('My Add-on Page');
    // cy.get('.page-title > .public-DraftStyleDefault-block').type('{enter}');
    // // Add block
    // cy.get('.ui.basic.icon.button.block-add-button').first().click();
    // cy.get('.blocks-chooser .title').contains('Media').click();
    // cy.get('.content.active.media .button.image').contains('Image').click();
    // // Save
    // cy.get('#toolbar-save').click();
    // cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');
    // // then the page view should contain our changes
    // cy.contains('My Add-on Page');
    // //cy.get('.block.image');
  });

  it('Products Page: testing search', () => {
    cy.wrap(products).each((p, i) => {
      var index = p.id + i;
      cy.createContentJSON({
        contentJSON: p,
        path: `/en/${pr.id}`,
        extras: { id: index, mapviewer_component: p.mapviewer_component },
      });
    });
    cy.navigate(`/en/${pr.id}?tab=explore`);
    cy.get('.left-menu .card.subcard.active a').should('contain', 'Explore');
    cy.get('.search-details').should('contain', 'Search results: 30');
    cy.get('.card-container').find('.card-block').should('have.length', 12);
    // visit second page
    cy.get('.ui.pagination.menu a').eq(2).click();
    cy.url().should('contain', 'page=2');
    cy.url().should('contain', 'tab=explore');
    cy.get('.card-container').find('.card-block').should('have.length', 12);
    // visit third page
    cy.get('.ui.pagination.menu a').eq(3).click();
    cy.url().should('contain', 'page=3');
    cy.url().should('contain', 'tab=explore');
    cy.get('.card-container').find('.card-block').should('have.length', 6);
  });
});
