import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';
import pr from '../fixtures/products.json';
import clc from '../fixtures/products/corine-land-cover.json';
import clc2018 from '../fixtures/datasets/clc2018.json';

describe('Dataset Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it('Corine land cover 2018:', () => {
    cy.createContentJSON({
      contentJSON: clc,
      path: `en/${pr.id}`,
      extras: { mapviewer_component: clc.mapviewer_component },
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${clc.id}` });

    cy.createContentJSON({
      contentJSON: clc2018,
      path: `/en/${pr.id}/${clc.id}`,
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${clc.id}/${clc2018.id}` });

    cy.navigate(`/en/${pr.id}/${clc.id}/${clc2018.id}`);
    cy.get('.left-menu .card.active a').should('contain', 'General info');

    // check first accordion
    cy.get('.ui.accordion').eq(0).get('.content.active').should('exist');
    cy.get('.ui.accordion')
      .eq(0)
      .get('.content.active h3')
      .contains('Access full metadata here');

    // logged out second tab
    cy.clearCookies();
    cy.visit(`/en/${pr.id}/${clc.id}/${clc2018.id}`);
    cy.get('.left-menu .card a').eq(1).click();
    cy.get('.ui.modal.visible .modal-login-title').contains(
      'This website uses EU Login for user authentication.',
    );
    cy.get('.ui.modal.visible .modal-close.modal-clms-close span').click();

    // logged in second tab
    cy.autologin();
    cy.visit(`/en/${pr.id}/${clc.id}/${clc2018.id}`);
    cy.get('.left-menu .card a').eq(1).click();
    cy.url().should('contain', '#download');
    cy.get('.left-menu .card.active a').should('contain', 'Download');
    cy.get('.dataset-download-area h2').contains('Download by area');

    // now navigating
    cy.navigate(`/en/${pr.id}/${clc.id}/${clc2018.id}#general_info`);
    cy.get('.left-menu .card.active a').should('contain', 'General info');
    cy.navigate(`/en/${pr.id}/${clc.id}/${clc2018.id}#download`);
    cy.get('.left-menu .card.active a').should('contain', 'Download');
  });
});
