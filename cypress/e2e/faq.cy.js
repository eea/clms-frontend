import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';
import faq from '../fixtures/faq.json';

import gq from '../fixtures/faq/categories/general-questions.json';
import dutac from '../fixtures/faq/categories/data-use-terms-and-conditions.json';

// import wic from '../fixtures/faq/faqs/what-is-copernicus.json';

describe('FAQ page Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('FAQ: tabs', () => {
    //create categoies
    cy.createContentJSON({ contentJSON: gq, path: `en/${faq.id}` });
    cy.setWorkflow({ path: `en/${faq.id}/${gq.id}` });
    cy.createContentJSON({ contentJSON: dutac, path: `en/${faq.id}` });
    cy.setWorkflow({ path: `en/${faq.id}/${dutac.id}` });
    // //create faqs
    // cy.createContentJSON({ contentJSON: wic, path: `en/${faq.id}/${gq.id}` });
    // cy.setWorkflow({ path: `en/${faq.id}/${gq.id}/${wic.id}` });

    cy.navigate(`/en/${faq.id}/`);
    cy.get('.left-menu .card.active a').should('contain', gq.title);

    // second tab
    cy.get('.left-menu .card a').eq(1).click();
    cy.get('.left-menu .card.active a').should('contain', dutac.title);
    cy.url().should('contain', '#data_use_terms_and_conditions');

    cy.navigate(`/en/${faq.id}#general_questions`);
    cy.get('.left-menu .card.active a').should('contain', gq.title);

    cy.navigate(`/en/${faq.id}#data_use_terms_and_conditions`);
    cy.get('.left-menu .card.active a').should('contain', dutac.title);
  });
});
