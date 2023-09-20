import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';
import pr from '../fixtures/products.json';
import clc from '../fixtures/products/corine-land-cover.json';
import gdlc from '../fixtures/products/global-dynamic-land-cover.json';
import cz from '../fixtures/products/coastal-zones.json';

const batch_size = 12;
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
    cz,
    cz,
    cz,
    cz,
    cz,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
    cz,
    clc,
    gdlc,
    cz,
    gdlc,
    clc,
    gdlc,
    clc,
    gdlc,
    clc,
  ];

  // it('Products Page: testing tabs', () => {
  //   cy.navigate(`/en/${pr.id}`);
  //   cy.wait(500);
  //   cy.scrollTo('top');
  //   cy.get('.left-menu .card.subcard.active a').should(
  //     'contain',
  //     'Get overview',
  //   );
  //   cy.get('.left-menu .card.subcard a').contains('Explore').click();
  //   cy.wait(500);
  //   cy.scrollTo('top');
  //   cy.get('.left-menu .card.subcard.active a').should('contain', 'Explore');
  //   cy.url().should(
  //     'eq',
  //     Cypress.config().baseUrl + `/en/${pr.id}?tab=explore`,
  //   );
  //   cy.get('.left-menu .card a').contains('What is coming?').click();
  //   cy.scrollTo('top');
  //   cy.get('.left-menu .card.active a').should('contain', 'What is coming?');
  //   cy.url().should(
  //     'eq',
  //     Cypress.config().baseUrl + `/en/${pr.id}?tab=what_is_coming`,
  //   );
  //   // Change page title
  //   // cy.get('.page-title > .public-DraftStyleDefault-block')
  //   //   .clear()
  //   //   .type('My Add-on Page')
  //   //   .get('.page-title span[data-text]')
  //   //   .contains('My Add-on Page');
  //   // cy.get('.page-title > .public-DraftStyleDefault-block').type('{enter}');
  //   // // Add block
  //   // cy.get('.ui.basic.icon.button.block-add-button').first().click();
  //   // cy.get('.blocks-chooser .title').contains('Media').click();
  //   // cy.get('.content.active.media .button.image').contains('Image').click();
  //   // // Save
  //   // cy.get('#toolbar-save').click();
  //   // cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');
  //   // // then the page view should contain our changes
  //   // cy.contains('My Add-on Page');
  //   // //cy.get('.block.image');
  // });

  it('Products Page: testing search', () => {
    cy.wrap(products).each((p, i) => {
      var index = p.id + i;
      cy.createContentJSON({
        contentJSON: p,
        path: `/en/${pr.id}`,
        extras: {
          id: index,
          mapviewer_component: p.mapviewer_component,
          component_title: p.component_title,
        },
      });
    });
    cy.navigate(`/en/${pr.id}?tab=explore`);
    cy.get('.left-menu .card.subcard.active a').should('contain', 'Explore');
    cy.get('.search-details').should('contain', 'Search results: 30');
    cy.get('.searchBlock-facets .card-container')
      .find('.card-block')
      .should('have.length', batch_size);

    // visit second page
    cy.get('.ui.pagination.menu a').eq(2).click();
    cy.url().should('contain', 'page=2');
    cy.url().should('contain', 'tab=explore');
    cy.wait(500);
    cy.get('.searchBlock-facets .card-container')
      .find('.card-block')
      .should('have.length', batch_size);

    // visit third page
    cy.get('.ui.pagination.menu a').eq(3).click();
    cy.url().should('contain', 'page=3');
    cy.url().should('contain', 'tab=explore');
    cy.get('.searchBlock-facets .card-container')
      .find('.card-block')
      .should('have.length', 6);

    // navigate to the filtered url
    cy.navigate(
      `/en/${pr.id}?b_size=12&query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.any%22%2C%22v%22%3A%5B%22Product%22%5D%7D%2C%7B%22i%22%3A%22component_title%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%222a04c969-7f91-476f-8ab2-6fb4a7588896%22%5D%7D%5D&sort_on=getObjPositionInParent&sort_order=ascending&tab=explore`,
    );
    cy.wait(500);
    cy.get('.search-details').should('contain', 'Search results: 23');

    // reload the filtered url
    cy.reload();
    cy.wait(500);
    cy.get('.search-details').should('contain', 'Search results: 23');

    // navigate /en and the to filtered url
    cy.navigate('/en');
    cy.navigate(
      `/en/${pr.id}?b_size=12&query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.any%22%2C%22v%22%3A%5B%22Product%22%5D%7D%2C%7B%22i%22%3A%22component_title%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%222a04c969-7f91-476f-8ab2-6fb4a7588896%22%5D%7D%5D&sort_on=getObjPositionInParent&sort_order=ascending&tab=explore`,
    );
    cy.wait(500);
    cy.get('.search-details').should('contain', 'Search results: 23');

    // navigate /en reload and then to filtered url
    cy.navigate('/en');
    cy.reload();
    cy.navigate(
      `/en/${pr.id}?b_size=12&query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.any%22%2C%22v%22%3A%5B%22Product%22%5D%7D%2C%7B%22i%22%3A%22component_title%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%222a04c969-7f91-476f-8ab2-6fb4a7588896%22%5D%7D%5D&sort_on=getObjPositionInParent&sort_order=ascending&tab=explore`,
    );
    cy.wait(500);
    cy.get('.search-details').should('contain', 'Search results: 23');

    // navigate /en the to filtered url and reload
    cy.navigate('/en');
    cy.navigate(
      `/en/${pr.id}?b_size=12&query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.selection.any%22%2C%22v%22%3A%5B%22Product%22%5D%7D%2C%7B%22i%22%3A%22component_title%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%222a04c969-7f91-476f-8ab2-6fb4a7588896%22%5D%7D%5D&sort_on=getObjPositionInParent&sort_order=ascending&tab=explore`,
    );
    cy.reload();
    cy.wait(500);
    cy.get('.search-details').should('contain', 'Search results: 23');
  });
});
