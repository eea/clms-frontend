import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';
import wo from '../fixtures/work-opportunities.json';

describe('Work opportunities page Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Work opportunities: tabs', () => {
    cy.navigate(`/en/${wo.id}/`);
    cy.get('.left-menu .card.active a').should('contain', 'Calls for tenders');
    cy.get('.panel.panel-selected h3#open-calls-for-tenders').should(
      'contain',
      'Open calls for tenders',
    );
    cy.get('.block.listing.CclWOOpenTenders div').should(
      'contain',
      'We have no published public procurements now.',
    );
    cy.get('.panel.panel-selected h3#closed-calls-for-tenders').should(
      'contain',
      'Closed calls for tenders',
    );
    cy.get('.block.listing.CclWOCloseTenders div').should(
      'contain',
      'No results found',
    );

    // second tab
    cy.get('.left-menu .card a').eq(1).click();
    cy.get('.left-menu .card.active a').should('contain', 'Vacancies');
    cy.get('.panel.panel-selected h3#open-vacancies').should(
      'contain',
      'Open vacancies',
    );
    cy.get('.block.listing.CclWOOpenTenders div').should(
      'contain',
      'We have no open vacancies now.',
    );
    cy.get('.panel.panel-selected h3#closed-vacancies').should(
      'contain',
      'Closed vacancies',
    );
    cy.get('.block.listing.CclWOCloseTenders div').should(
      'contain',
      'No results found',
    );
    cy.url().should('contain', '?tab=vacancies');

    // now navigating
    // first tab
    cy.navigate(`/en/${wo.id}?tab=calls_for_tenders`);
    cy.get('.left-menu .card.active a').should('contain', 'Calls for tenders');
    cy.get('.panel.panel-selected h3#open-calls-for-tenders').should(
      'contain',
      'Open calls for tenders',
    );
    cy.get('.panel.panel-selected h3#closed-calls-for-tenders').should(
      'contain',
      'Closed calls for tenders',
    );

    // second tab
    cy.navigate(`/en/${wo.id}?tab=vacancies`);
    cy.get('.left-menu .card.active a').should('contain', 'Vacancies');
    cy.get('.panel.panel-selected h3#open-vacancies').should(
      'contain',
      'Open vacancies',
    );
    cy.get('.panel.panel-selected h3#closed-vacancies').should(
      'contain',
      'Closed vacancies',
    );
  });
});
