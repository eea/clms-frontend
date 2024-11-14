import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';

describe('Profile view Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);
  let tab_title = '';
  const profile_id = 'profile';

  it('Profile view: tabs', () => {
    cy.navigate(`/en/${profile_id}/`);
    tab_title = 'User profile';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // second tab
    cy.get('.left-menu .card a').eq(1).click();
    tab_title = 'API tokens';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);
    cy.url().should('contain', '#api_tokens');

    // third tab
    cy.get('.left-menu .card a').eq(7).click();
    tab_title = 'Delete profile';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', 'Delete your profile');
    cy.url().should('contain', '#delete_profile');

    // now navigating
    // first tab
    cy.navigate(`/en/${profile_id}#user_profile`);
    tab_title = 'User profile';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // second tab
    cy.navigate(`/en/${profile_id}#api_tokens`);
    tab_title = 'API tokens';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // third tab
    cy.navigate(`/en/${profile_id}#delete_profile`);
    tab_title = 'Delete profile';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', 'Delete your profile');

    // cy.get('.card.active a').should('contain', 'Main');
    // // second tab
    // cy.navigate(`/en/products/${clc.id}?tab=applications__use_cases`);
    // cy.get('.left-menu .card.active a').should(
    //   'contain',
    //   'Applications & use cases',
    // );
    // // third tab
    // cy.navigate(`/en/products/${clc.id}?tab=roadmap`);
    // cy.get('.left-menu .card.active a').should('contain', 'Roadmap');
  });
});
