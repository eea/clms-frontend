import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';

describe('Profile view Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);
  let tab_title = '';

  it('Profile view: tabs', () => {
    cy.navigate('/en/profile/');
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
    cy.get('.left-menu .card a').eq(2).click();
    tab_title = 'Newsletter subscribers';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should(
      'contain',
      'Download a list of newsletter subscribers',
    );
    cy.url().should('contain', '#newsletter_subscribers');

    // fourth tab
    cy.get('.left-menu .card a').eq(3).click();
    tab_title = 'Subscribe to the newsletter';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);
    cy.url().should('contain', '#subscribe_to_the_newsletter');

    // fifth tab
    cy.get('.left-menu .card a').eq(4).click();
    tab_title = 'Subscribe to news notifications';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);
    cy.url().should('contain', '#subscribe_to_news_notifications');

    // sixth tab
    cy.get('.left-menu .card a').eq(5).click();
    tab_title = 'Subscribe to event notifications';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);
    cy.url().should('contain', '#subscribe_to_event_notifications');

    // seventh tab
    cy.get('.left-menu .card a').eq(6).click();
    tab_title = 'Delete profile';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', 'Delete your profile');
    cy.url().should('contain', '#delete_profile');

    // now navigating
    // first tab
    cy.navigate(`/en/profile#user_profile`);
    tab_title = 'User profile';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // second tab
    cy.navigate(`/en/profile#api_tokens`);
    tab_title = 'API tokens';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // third tab
    cy.navigate(`/en/profile#newsletter_subscribers`);
    tab_title = 'Newsletter subscribers';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should(
      'contain',
      'Download a list of newsletter subscribers',
    );

    // fourth tab
    cy.navigate(`/en/profile#subscribe_to_the_newsletter`);
    tab_title = 'Subscribe to the newsletter';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // fifth tab
    cy.navigate(`/en/profile#subscribe_to_news_notifications`);
    tab_title = 'Subscribe to news notifications';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // sixth tab
    cy.navigate(`/en/profile#subscribe_to_event_notifications`);
    tab_title = 'Subscribe to event notifications';
    cy.get('.left-menu .card.active a').should('contain', tab_title);
    cy.get('h1.page-title').should('contain', tab_title);

    // seventh tab
    cy.navigate(`/en/profile#delete_profile`);
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
