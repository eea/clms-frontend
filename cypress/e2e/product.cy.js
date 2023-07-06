import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';
import clc from '../fixtures/products/corine-land-cover.json';

describe('Products Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Corine land cover:', () => {
    cy.createContentJSON({
      contentJSON: clc,
      path: 'en/products',
      extras: { mapviewer_component: clc.mapviewer_component },
    });
    cy.navigate(`/en/products/${clc.id}`);
    cy.get('.left-menu .card.active a').should('contain', 'Main');
    // second tab
    cy.get('.left-menu .card a').eq(1).click();
    cy.get('.left-menu .card.active a').should(
      'contain',
      'Applications & use cases',
    );
    cy.url().should('contain', 'tab=applications__use_cases');
    // third tab
    cy.get('.left-menu .card a').eq(2).click();
    cy.get('.left-menu .card.active a').should('contain', 'Roadmap');
    cy.url().should('contain', 'tab=roadmap');

    // now navigating
    // first tab
    cy.navigate(`/en/products/${clc.id}?tab=main`);
    cy.get('.card.active a').should('contain', 'Main');
    // second tab
    cy.navigate(`/en/products/${clc.id}?tab=applications__use_cases`);
    cy.get('.left-menu .card.active a').should(
      'contain',
      'Applications & use cases',
    );
    // third tab
    cy.navigate(`/en/products/${clc.id}?tab=roadmap`);
    cy.get('.left-menu .card.active a').should('contain', 'Roadmap');
  });
});
