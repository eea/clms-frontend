import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';
import faq from '../fixtures/faq.json';

import gq from '../fixtures/faq/categories/general-questions.json';
import dutac from '../fixtures/faq/categories/data-use-terms-and-conditions.json';

import wic from '../fixtures/faq/faqs/what-is-copernicus.json';
import wiclms from '../fixtures/faq/faqs/what-is-copernicus-land-monitoring-service.json';
import icdfocfau from '../fixtures/faq/faqs/is-clms-data-free-of-charge-for-all-users.json';
import ciucdfcp from '../fixtures/faq/faqs/can-i-use-clms-data-for-commercial-purpose.json';

describe('FAQ page Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);
  const activeSelector =
    '.tab-content>.accordion-block .ui.accordion:has(.content.active) h2.title span';
  const inactiveSelector =
    '.tab-content>.accordion-block .ui.accordion:not(:has(.content.active)) h2.title span';

  it('FAQ: tabs', () => {
    //create categoies
    cy.createContentJSON({
      contentJSON: gq,
      path: `en/${faq.id}`,
    });
    cy.setWorkflow({ path: `en/${faq.id}/${gq.id}` });
    cy.createContentJSON({
      contentJSON: dutac,
      path: `en/${faq.id}`,
    });
    cy.setWorkflow({ path: `en/${faq.id}/${dutac.id}` });
    // //create faqs
    cy.createContentJSON({
      contentJSON: wic,
      path: `en/${faq.id}/${gq.id}`,
    });
    cy.setWorkflow({
      path: `en/${faq.id}/${gq.id}/${wic.id}`,
    });
    cy.createContentJSON({
      contentJSON: wiclms,
      path: `en/${faq.id}/${gq.id}`,
    });
    cy.setWorkflow({
      path: `en/${faq.id}/${gq.id}/${wiclms.id}`,
    });

    cy.createContentJSON({
      contentJSON: icdfocfau,
      path: `en/${faq.id}/${dutac.id}`,
    });
    cy.setWorkflow({
      path: `en/${faq.id}/${dutac.id}/${icdfocfau.id}`,
    });
    cy.createContentJSON({
      contentJSON: ciucdfcp,
      path: `en/${faq.id}/${dutac.id}`,
    });
    cy.setWorkflow({
      path: `en/${faq.id}/${dutac.id}/${ciucdfcp.id}`,
    });

    cy.navigate(`/en/${faq.id}/`);
    cy.wait(20000); // tests keep failing, TODO: remove this
    cy.get('.left-menu .card.active a').should('contain', gq.title);

    // FAQ TESTS
    cy.get(activeSelector).eq(0).should('contain', wic.title);
    cy.get(inactiveSelector).eq(0).should('contain', wiclms.title);

    // open the faq clicking
    cy.get(inactiveSelector).eq(0).click();
    cy.get(activeSelector).eq(0).should('contain', wic.title);
    cy.get(activeSelector).eq(1).should('contain', wiclms.title);

    // close the first faq
    cy.get(activeSelector).eq(0).click();
    cy.get(inactiveSelector).eq(0).should('contain', wic.title);
    cy.get(activeSelector).eq(0).should('contain', wiclms.title);

    // -- Second tab
    cy.get('.left-menu .card a').eq(1).click();
    cy.get('.left-menu .card.active a').should('contain', dutac.title);
    cy.url().should('contain', '#data_use_terms_and_conditions');

    // FAQ TESTS
    cy.get(activeSelector).eq(0).should('contain', icdfocfau.title);
    cy.get(inactiveSelector).eq(0).should('contain', ciucdfcp.title);

    // open the faq clicking
    cy.get(inactiveSelector).eq(0).click();
    cy.get(activeSelector).eq(0).should('contain', icdfocfau.title);
    cy.get(activeSelector).eq(1).should('contain', ciucdfcp.title);

    // close the first faq
    cy.get(activeSelector).eq(0).click();
    cy.get(inactiveSelector).eq(0).should('contain', icdfocfau.title);
    cy.get(activeSelector).eq(0).should('contain', ciucdfcp.title);

    // -- Back first tab clicking
    cy.get('.left-menu .card a').eq(0).click();
    cy.get('.left-menu .card.active a').should('contain', gq.title);
    cy.url().should('contain', '#general_questions');
    cy.get(inactiveSelector).eq(0).should('contain', wic.title);
    cy.get(activeSelector).eq(0).should('contain', wiclms.title);

    // now navigating
    // first tab
    cy.navigate(`/en/${faq.id}#general_questions`);
    cy.get('.left-menu .card.active a').should('contain', gq.title);
    cy.get(activeSelector).eq(0).should('contain', wic.title);
    cy.get(inactiveSelector).eq(0).should('contain', wiclms.title);

    // second tab
    cy.navigate(`/en/${faq.id}#data_use_terms_and_conditions`);
    cy.get('.left-menu .card.active a').should('contain', dutac.title);
    cy.get(activeSelector).eq(0).should('contain', icdfocfau.title);
    cy.get(inactiveSelector).eq(0).should('contain', ciucdfcp.title);
  });
});
