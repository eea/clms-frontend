import fsc2016p20med from '../fixtures/datasets/fsc2016p20med.json';
import lc2019 from '../fixtures/datasets/lc2019.json';
import wws2018 from '../fixtures/datasets/wws2018.json';
import clc2018 from '../fixtures/datasets/clc2018.json';
import pr from '../fixtures/products.json';
import snow from '../fixtures/products/snow.json';
import clc from '../fixtures/products/corine-land-cover.json';
import gdlc from '../fixtures/products/global-dynamic-land-cover.json';
import hrlwaw from '../fixtures/products/high-resolution-layer-water-and-wetness.json';
import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';

function selectEntireCart() {
  // Select entire cart
  cy.get('td.table-td-checkbox div.ui.checkbox input').each(($checkbox) => {
    cy.wrap($checkbox).parent().should('not.have.class', 'checked');
    cy.wrap($checkbox).click({ force: true });
    cy.wrap($checkbox).parent().should('have.class', 'checked');
  });
}

const fsc2016p20med_cart = [
  {
    id: '10ee0f23fcb146ea89dcdacc40b0900d',
    UID: '10ee0f23fcb146ea89dcdacc40b0900d',
    unique_id: '10ee0f23fcb146ea89dcdacc40b0900d-1714029065467',
    area: { type: 'nuts', value: 'CH070' },
  },
  {
    id: '10ee0f23fcb146ea89dcdacc40b0900d',
    UID: '10ee0f23fcb146ea89dcdacc40b0900d',
    unique_id: '10ee0f23fcb146ea89dcdacc40b0900d-1714029106006',
    area: {
      type: 'polygon',
      value: [
        4.793243408197946,
        47.51309498089495,
        12.285919189445956,
        45.06922747397114,
      ],
    },
  },
  {
    id: '10ee0f23fcb146ea89dcdacc40b0900d',
    UID: '10ee0f23fcb146ea89dcdacc40b0900d',
    unique_id: '10ee0f23fcb146ea89dcdacc40b0900d-1714029113180',
    area: {
      type: 'polygon',
      value: [
        1.138885498049947,
        44.00424773455604,
        3.4089660644483097,
        41.223676911965015,
      ],
    },
  },
  {
    id: '10ee0f23fcb146ea89dcdacc40b0900d',
    UID: '10ee0f23fcb146ea89dcdacc40b0900d',
    unique_id: '10ee0f23fcb146ea89dcdacc40b0900d-1714029128660',
    area: { type: 'nuts', value: 'ES' },
  },
];

const lc2019_cart = [
  {
    id: 'a8d945f0edd143a0a5240c28bafa23da',
    UID: 'a8d945f0edd143a0a5240c28bafa23da',
    unique_id: 'a8d945f0edd143a0a5240c28bafa23da-1714028889605',
    area: { type: 'nuts', value: 'FRJ11' },
  },
  {
    id: 'a8d945f0edd143a0a5240c28bafa23da',
    UID: 'a8d945f0edd143a0a5240c28bafa23da',
    unique_id: 'a8d945f0edd143a0a5240c28bafa23da-1714028914341',
    area: {
      type: 'polygon',
      value: [
        3.2318115234328975,
        45.653958892989486,
        5.71472167968224,
        44.27035227147864,
      ],
    },
  },
];

const wws2018_cart = [
  {
    id: '0acef4675a4c4a548896cca00281f434',
    UID: '0acef4675a4c4a548896cca00281f434',
    unique_id: '0acef4675a4c4a548896cca00281f434-1714027662797',
    area: {
      type: 'polygon',
      value: [
        3.6547851562452203,
        43.96777972032616,
        5.676269531244683,
        43.12370611211697,
      ],
    },
  },
  {
    id: '0acef4675a4c4a548896cca00281f434',
    UID: '0acef4675a4c4a548896cca00281f434',
    unique_id: '0acef4675a4c4a548896cca00281f434-1714027690066',
    area: { type: 'nuts', value: 'NL12', valueName: 'Friesland (NL)' },
  },
];

const clc2018_cart = [
  {
    id: '0407d497d3c44bcd93ce8fd5bf78596a',
    UID: '0407d497d3c44bcd93ce8fd5bf78596a',
    unique_id: '0407d497d3c44bcd93ce8fd5bf78596a-1714027573333',
    area: {
      type: 'polygon',
      value: [
        -2.497558593753114,
        43.143749567024514,
        -1.2890625000034355,
        42.64473395779312,
      ],
    },
  },
  {
    id: '0407d497d3c44bcd93ce8fd5bf78596a',
    UID: '0407d497d3c44bcd93ce8fd5bf78596a',
    unique_id: '0407d497d3c44bcd93ce8fd5bf78596a-1714027590164',
    area: { type: 'nuts', value: 'ES513', valueName: 'Lleida' },
  },
];

const all_cart = [
  ...fsc2016p20med_cart,
  ...lc2019_cart,
  ...wws2018_cart,
  ...clc2018_cart,
];
// const rest_cart = [
//   {
//     UID: 'c987cc580fcc40f7b7b4c31fec0a5312',
//     file_id: 'c2451d85-073d-4ec4-aeae-be0e6da7a1eb',
//     area: 'Austria',
//     file: 'AT001L2_WIEN',
//     unique_id:
//       'c987cc580fcc40f7b7b4c31fec0a5312_c2451d85-073d-4ec4-aeae-be0e6da7a1eb',
//   },
//   {
//     UID: 'c987cc580fcc40f7b7b4c31fec0a5312',
//     file_id: '6ff9b55f-e0b8-47c5-bc45-325facf274c1',
//     area: 'Austria',
//     file: 'AT002L2_GRAZ',
//     unique_id:
//       'c987cc580fcc40f7b7b4c31fec0a5312_6ff9b55f-e0b8-47c5-bc45-325facf274c1',
//   },
// ];

const success_reponse = {
  statusCode: 200,
  body: { msg: 'success!', status: 'success' },
};

describe('Cart Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.clearLocalStorage();
    cy.intercept('GET', '@projections').as('projections');
    cy.intercept('GET', '@nuts_name').as('nuts_name');
    cy.visit(`/en/cart`);
    cy.wait('@projections');
    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });
  // afterEach(() => {
  //   cy.clearLocalStorage();
  // });

  before(() => {
    setupBeforeEach();
    // create projects
    cy.createContentJSON({
      contentJSON: snow,
      path: `en/${pr.id}`,
      extras: { mapviewer_component: snow.mapviewer_component },
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${snow.id}` });

    cy.createContentJSON({
      contentJSON: gdlc,
      path: `en/${pr.id}`,
      extras: { mapviewer_component: gdlc.mapviewer_component },
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${gdlc.id}` });

    cy.createContentJSON({
      contentJSON: hrlwaw,
      path: `en/${pr.id}`,
      extras: { mapviewer_component: hrlwaw.mapviewer_component },
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${hrlwaw.id}` });

    cy.createContentJSON({
      contentJSON: clc,
      path: `en/${pr.id}`,
      extras: { mapviewer_component: clc.mapviewer_component },
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${clc.id}` });

    //create datasets
    cy.createContentJSON({
      contentJSON: fsc2016p20med,
      path: `/en/${pr.id}/${snow.id}`,
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${snow.id}/${fsc2016p20med.id}` });

    cy.createContentJSON({
      contentJSON: { ...lc2019, datasets: [] }, //ignore related datasets
      path: `en/${pr.id}/${gdlc.id}`,
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${gdlc.id}/${lc2019.id}` });

    cy.createContentJSON({
      contentJSON: { ...wws2018, datasets: [] }, //ignore related datasets
      path: `en/${pr.id}/${hrlwaw.id}`,
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${hrlwaw.id}/${wws2018.id}` });

    cy.createContentJSON({
      contentJSON: { ...clc2018, datasets: [] }, //ignore related datasets
      path: `en/${pr.id}/${clc.id}`,
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${clc.id}/${clc2018.id}` });
  });

  after(() => {
    tearDownAfterEach();
  });

  it('Test UTM projection selector', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify(fsc2016p20med_cart),
        );
      },
    });
    cy.wait('@projections');
    cy.wait(10000);
    cy.get('li a.header-login-link strong').should('contain', '4');
    cy.get('td.table-td-projections', { timeout: 10000 })
      .contains('EPSG:3035')
      .should('exist');

    // first cart item check and modify the selection
    cy.get('td.table-td-projections', { timeout: 10000 })
      .eq(0)
      .then(($line) => {
        let selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        const choices = $line.find('.ui.selection.dropdown .item');
        expect(selected.text()).to.eq('EPSG:3035');
        expect(choices).to.have.lengthOf(4);
        selected.click();
        choices.eq(1).click();
        choices.eq(1).click();
        selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        expect(selected.text()).to.eq('EPSG:3857');
      });

    cy.get('td.table-td-projections', { timeout: 10000 })
      .eq(1)
      .then(($line) => {
        let selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        const choices = $line.find('.ui.selection.dropdown .item');
        expect(selected.text()).to.eq(
          'EPSG:32631 (Source system of the dataset)',
        );
        expect(choices).to.have.lengthOf(5);

        selected.click();
        choices.eq(1).click();
        choices.eq(1).click();
        selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        expect(selected.text()).to.eq('EPSG:3857');
      });

    cy.get('td.table-td-projections', { timeout: 10000 })
      .eq(2)
      .then(($line) => {
        let selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        const choices = $line.find('.ui.selection.dropdown .item');

        expect(selected.text()).to.eq('EPSG:3035');
        expect(choices).to.have.lengthOf(4);
      });

    cy.get('td.table-td-projections', { timeout: 10000 })
      .eq(3)
      .then(($line) => {
        let selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        const choices = $line.find('.ui.selection.dropdown .item');

        expect(selected.text()).to.eq(
          'EPSG:32632 (Source system of the dataset)',
        );
        expect(choices).to.have.lengthOf(5);
      });

    // Duplicate the last element
    cy.get('td.text-end').eq(3).find('.info-icon').eq(0).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '5');
    cy.get('td.table-td-projections', { timeout: 10000 })
      .should('have.length.at.least', 5)
      .eq(4)
      .find('.ui.selection.dropdown .item')
      .should('have.length', 5)
      .then(($items) => {
        cy.wrap($items)
          .closest('.ui.selection.dropdown')
          .find('div.text')
          .should('have.text', 'EPSG:32632 (Source system of the dataset)');
      });

    // Duplicate the second element
    cy.get('td.text-end').eq(1).find('.info-icon').eq(0).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '6');
    cy.get('td.table-td-projections', { timeout: 10000 })
      .should('have.length.at.least', 6)
      .eq(2)
      .within(() => {
        cy.get('.ui.selection.dropdown .item').should('have.length', 5);
        cy.get('.ui.selection.dropdown div.text')
          .eq(0)
          .should('have.text', 'EPSG:3857');
      });

    // intercept the POST and check the body data
    cy.intercept('POST', '@datarequest_post', (req) => {
      expect(req.body.Datasets[0].OutputGCS).to.eq('EPSG:3857');
      expect(req.body.Datasets[1].OutputGCS).to.eq('EPSG:3857');
      expect(req.body.Datasets[2].OutputGCS).to.eq('EPSG:3857');
      expect(req.body.Datasets[3].OutputGCS).to.eq('EPSG:3035');
      expect(req.body.Datasets[4].OutputGCS).to.eq('EPSG:32632');
      expect(req.body.Datasets[5].OutputGCS).to.eq('EPSG:32632');
      req.reply(success_reponse);
    }).as('datarequest_post');

    selectEntireCart();

    cy.contains(
      'You need to select the dates interval for some of your download items',
    );
    cy.get('.ccl-container .ccl-button--default').should(
      'have.attr',
      'disabled',
    );

    cy.get('td.table-td-timeseries').each(($el) => {
      cy.selectDatesRange($el, 3);
    });

    // Download cart
    cy.get(
      '.content-area .ui.container .ccl-container a.ccl-button.ccl-button--default',
    ).click();

    //expect an empty cart
    cy.wait('@datarequest_post');
    cy.visit('/en/cart');
    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });

  it('Test Timeseries calendar', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify([fsc2016p20med_cart[0]]),
        );
      },
    });
    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '1');

    cy.get('td.table-td-timeseries')
      .should('have.length.at.least', 1)
      .each(($el) => {
        cy.selectDatesRange($el, 3);
      });

    // intercept the POST and check the body data
    cy.intercept(
      {
        method: 'POST',
        url: '@datarequest_post',
      },
      (req) => {
        expect(req.body.Datasets[0].TemporalFilter.EndDate).to.be.greaterThan(
          0,
        );
        expect(req.body.Datasets[0].TemporalFilter.StartDate).to.be.greaterThan(
          0,
        );
        req.reply(success_reponse);
      },
    ).as('datarequest_post');

    selectEntireCart();

    // Download cart
    cy.get(
      '.content-area .ui.container .ccl-container a.ccl-button.ccl-button--default',
    ).click();
    cy.wait('@datarequest_post');

    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });

  it('Test dataset without date', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify([fsc2016p20med_cart[0]]),
        );
      },
    });
    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '1');

    cy.get('td.table-td-timeseries', { timeout: 10000 })
      .should('have.length.at.least', 1)
      .eq(0)
      .find('.info-icon')
      .eq(0)
      .find('button span')
      .should('contain', 'Select dates');

    selectEntireCart();

    // Download cart
    cy.contains(
      'You need to select the dates interval for some of your download items',
    );
    cy.get('.ccl-container .ccl-button--default').should(
      'have.attr',
      'disabled',
    );

    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should(
      'not.contain',
      'Empty cart',
    );
    cy.get('li a.header-login-link strong').should('contain', '1');
  });

  it('Test Layer/Band selector', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify(lc2019_cart),
        );
      },
    });
    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '2');

    // first cart item check and modify the selection
    cy.get('td .ui.selection.dropdown.layer-selector')
      .eq(0)
      .should('be.visible')
      .then(($selector) => {
        let selected = $selector.find('div.divider.text');
        const choices = $selector.find('div.menu .item');
        expect(selected.text()).to.eq(
          'Land Cover Classification: Discrete classification',
        );
        expect(choices).to.have.lengthOf(15);

        cy.wrap(choices.eq(4))
          .click({ force: true })
          .should(() => {
            expect(selected.text()).to.eq('Cover Fraction: Cropland');
          });
      });

    // intercept the POST and check the body data
    cy.intercept(
      {
        method: 'POST',
        url: '@datarequest_post',
      },
      (req) => {
        expect(req.body.Datasets[0].Layer).to.eq('Cover Fraction: Cropland');
        expect(req.body.Datasets[1].Layer).to.eq(
          'Land Cover Classification: Discrete classification',
        );
        req.reply(success_reponse);
      },
    ).as('datarequest_post');

    selectEntireCart();

    // Download cart
    cy.get(
      '.content-area .ui.container .ccl-container a.ccl-button.ccl-button--default',
    ).click();
    cy.wait('@datarequest_post');

    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });

  it('Test Collection selector', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify(wws2018_cart),
        );
      },
    });

    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '2');

    // first cart item check and modify the selectors
    cy.get('td .ui.selection.dropdown.collection-selector')
      .eq(0)
      .should('be.visible')
      .then(($selector) => {
        let selected = $selector.find('div.divider.text');
        const choices = $selector.find('div.menu .item');
        expect(selected.text()).to.eq('10 m');
        expect(choices).to.have.lengthOf(2);
        choices.eq(1).click();
        choices.eq(1).click();
        expect(selected.text()).to.eq('100 m');
      });

    // intercept the POST and check the body data
    cy.intercept(
      {
        method: 'POST',
        url: '@datarequest_post',
      },
      (req) => {
        expect(req.body.Datasets[0].DatasetDownloadInformationID).to.eq(
          '95edd973-a059-46f1-b5dd-6fb2287dbb86',
        );

        expect(req.body.Datasets[1].DatasetDownloadInformationID).to.eq(
          'd170eb21-c4b4-47f5-88c7-958359704542',
        );
        req.reply(success_reponse);
      },
    ).as('datarequest_post');

    selectEntireCart();

    // Download cart
    cy.get(
      '.content-area .ui.container .ccl-container a.ccl-button.ccl-button--default',
    ).click();
    cy.wait('@datarequest_post');

    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });

  it('Test Type and Format selectors', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify(clc2018_cart),
        );
      },
    });

    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '2');
    cy.get('td .collection-container').eq(0).should('have.text', '-');
    cy.get('td .ui.selection.dropdown.format-selector')
      .eq(0)
      .should('be.visible')
      .then(($selector) => {
        let selected = $selector.find('div.divider.text');
        const choices = $selector.find('div.menu .item');
        expect(selected.text()).to.eq('File Geodatabase (FGDB)');
        expect(choices).to.have.lengthOf(5);
        choices.eq(1).click();
        choices.eq(1).click();
        expect(selected.text()).to.eq('Geography Markup Language (GML)');
      });

    cy.get('td .ui.selection.dropdown.type-selector')
      .eq(0)
      .then(($selector) => {
        let selected = $selector.find('div.divider.text');
        const choices = $selector.find('div.menu .item');
        expect(selected.text()).to.eq('VECTOR');
        expect(choices).to.have.lengthOf(2);
        choices.eq(1).click();
        choices.eq(1).click();
        expect(selected.text()).to.eq('RASTER');
      });
    cy.get('td .collection-container').eq(0).should('have.text', '100 m');
    cy.get('td .format-container').eq(0).should('have.text', 'Geotiff');

    // intercept the POST and check the body data
    cy.intercept(
      {
        method: 'POST',
        url: '@datarequest_post',
      },
      (req) => {
        expect(req.body.Datasets[0].OutputFormat).to.eq('Geotiff');
        expect(req.body.Datasets[0].DatasetDownloadInformationID).to.eq(
          '7bcdf9d1-6ba0-4d4e-afa8-01451c7316cb',
        );

        expect(req.body.Datasets[1].OutputFormat).to.eq('GDB');
        expect(req.body.Datasets[1].DatasetDownloadInformationID).to.eq(
          '1bda2fbd-3230-42ba-98cf-69c96ac063bc',
        );
        req.reply(success_reponse);
      },
    ).as('datarequest_post');

    selectEntireCart();

    // Download cart
    cy.get(
      '.content-area .ui.container .ccl-container a.ccl-button.ccl-button--default',
    ).click();
    cy.wait('@datarequest_post');

    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });

  it('Test Cart pagination and clearing', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify(all_cart),
        );
      },
    });

    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '10');
    cy.get('.pagination-wrapper').should('not.exist');
    cy.get('tbody').find('tr').should('have.length', 10);

    // Duplicate the last element
    cy.get('td.text-end').eq(3).find('.info-icon').eq(0).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '11');
    cy.get('.pagination-wrapper').should('exist');
    cy.get('tbody').find('tr').should('have.length', 10);

    // Go to 2nd page
    cy.get('.pagination-wrapper .item').contains('2').click();
    cy.get('tbody').find('tr').should('have.length', 1);

    // Remove the element in the second page
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('.pagination-wrapper').should('not.exist');
    cy.get('tbody').find('tr').should('have.length', 10);

    //Remove all the elements
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '9');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '8');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '7');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '6');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '5');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '4');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '3');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '2');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('li a.header-login-link strong').should('contain', '1');
    cy.get('td.text-end').eq(0).find('.info-icon').eq(1).find('button').click();
    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });

  it('Test Cart downloading dataset with auxiliary calendar without dates', () => {
    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify([fsc2016p20med_cart[0]]),
        );
      },
    });
    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '1');

    cy.get('td.table-td-timeseries')
      .eq(0)
      .find('.info-icon')
      .eq(0)
      .find('button span')
      .should('contain', 'Select dates');
    // open timeseries datepicker
    cy.get('td.table-td-timeseries')
      .eq(0)
      .find('.info-icon')
      .eq(0)
      .find('button')
      .click();

    selectEntireCart();

    cy.contains(
      'You need to select the dates interval for some of your download items',
    );
    cy.get('.ccl-container .ccl-button--default').should(
      'have.attr',
      'disabled',
    );

    cy.get('td.table-td-timeseries').each(($el) => {
      cy.selectDatesRange($el, 3);
    });

    // intercept the POST and check the body data
    cy.intercept(
      {
        method: 'POST',
        url: '@datarequest_post',
      },
      (req) => {
        expect(req.body.Datasets[0].TemporalFilter.EndDate).to.be.greaterThan(
          0,
        );
        expect(req.body.Datasets[0].TemporalFilter.StartDate).to.be.greaterThan(
          0,
        );
        req.reply(success_reponse);
      },
    ).as('datarequest_post');

    // Download cart
    cy.get(
      '.content-area .ui.container .ccl-container a.ccl-button.ccl-button--default',
    ).click();
    cy.wait('@datarequest_post');

    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');
  });
});
