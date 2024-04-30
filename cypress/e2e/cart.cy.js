import fsc2016p20med from '../fixtures/datasets/fsc2016p20med.json';
import pr from '../fixtures/products.json';
import snow from '../fixtures/products/snow.json';
import { setupBeforeEach, tearDownAfterEach } from '../support/e2e';

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

const rest_cart = [
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

  {
    UID: 'c987cc580fcc40f7b7b4c31fec0a5312',
    file_id: 'c2451d85-073d-4ec4-aeae-be0e6da7a1eb',
    area: 'Austria',
    file: 'AT001L2_WIEN',
    unique_id:
      'c987cc580fcc40f7b7b4c31fec0a5312_c2451d85-073d-4ec4-aeae-be0e6da7a1eb',
  },
  {
    UID: 'c987cc580fcc40f7b7b4c31fec0a5312',
    file_id: '6ff9b55f-e0b8-47c5-bc45-325facf274c1',
    area: 'Austria',
    file: 'AT002L2_GRAZ',
    unique_id:
      'c987cc580fcc40f7b7b4c31fec0a5312_6ff9b55f-e0b8-47c5-bc45-325facf274c1',
  },
];

describe('Cart Tests', () => {
  beforeEach(setupBeforeEach);
  afterEach(tearDownAfterEach);

  it.skip('Check UTM projection selector:', () => {
    cy.clearLocalStorage();
    cy.intercept('GET', '@projections').as('projections');
    cy.intercept('GET', '@nuts_name').as('nuts_name');
    cy.createContentJSON({
      contentJSON: snow,
      path: `en/${pr.id}`,
      extras: { mapviewer_component: snow.mapviewer_component },
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${snow.id}` });

    cy.createContentJSON({
      contentJSON: fsc2016p20med,
      path: `/en/${pr.id}/${snow.id}`,
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${snow.id}/${fsc2016p20med.id}` });

    cy.navigate(`/en/cart`);
    cy.wait('@projections');
    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');

    cy.visit(`/en/cart`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'cart_session_admin',
          JSON.stringify(fsc2016p20med_cart),
        );
      },
    });
    cy.wait('@projections');
    cy.get('li a.header-login-link strong').should('contain', '4');

    cy.wait(2000);
    // first cart item check and modify the selection
    cy.get('td.table-td-projections')
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

    cy.get('td.table-td-projections')
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

    cy.get('td.table-td-projections')
      .eq(2)
      .then(($line) => {
        let selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        const choices = $line.find('.ui.selection.dropdown .item');

        expect(selected.text()).to.eq('EPSG:3035');
        expect(choices).to.have.lengthOf(4);
      });

    cy.get('td.table-td-projections')
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
    cy.wait(500);
    cy.get('li a.header-login-link strong').should('contain', '5');
    cy.get('td.table-td-projections')
      .eq(4)
      .then(($line) => {
        let selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        const choices = $line.find('.ui.selection.dropdown .item');

        expect(selected.text()).to.eq(
          'EPSG:32632 (Source system of the dataset)',
        );
        expect(choices).to.have.lengthOf(5);
      });

    // Duplicate the second element
    cy.get('td.text-end').eq(1).find('.info-icon').eq(0).find('button').click();
    cy.wait(500);
    cy.get('li a.header-login-link strong').should('contain', '6');
    cy.get('td.table-td-projections')
      .eq(2)
      .then(($line) => {
        let selected = $line.find('.ui.selection.dropdown div.text').eq(0);
        const choices = $line.find('.ui.selection.dropdown .item');

        expect(selected.text()).to.eq('EPSG:3857');
        expect(choices).to.have.lengthOf(5);
      });

    // intercept the POST and check the body data
    cy.intercept('POST', '@datarequest_post', (req) => {
      expect(req.body.Datasets[0].OutputGCS).to.eq('EPSG:3857');
      expect(req.body.Datasets[1].OutputGCS).to.eq('EPSG:3857');
      expect(req.body.Datasets[2].OutputGCS).to.eq('EPSG:3857');
      expect(req.body.Datasets[3].OutputGCS).to.eq('EPSG:3035');
      expect(req.body.Datasets[4].OutputGCS).to.eq('EPSG:32632');
      expect(req.body.Datasets[5].OutputGCS).to.eq('EPSG:32632');
    });

    // Select entire cart
    cy.get('td.table-td-checkbox div.ui.checkbox input').each(($checkbox) => {
      expect($checkbox.parent()).to.not.have.class('checked');
      $checkbox.click();
      expect($checkbox.parent()).to.have.class('checked');
    });

    // Download cart
    cy.get('a.ccl-button.ccl-button--default').click();
  });

  it('Check Timeseries calendar:', () => {
    cy.clearLocalStorage();
    cy.intercept('GET', '@projections').as('projections');
    cy.intercept('GET', '@nuts_name').as('nuts_name');
    cy.createContentJSON({
      contentJSON: snow,
      path: `en/${pr.id}`,
      extras: { mapviewer_component: snow.mapviewer_component },
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${snow.id}` });

    cy.createContentJSON({
      contentJSON: fsc2016p20med,
      path: `/en/${pr.id}/${snow.id}`,
    });
    cy.setWorkflow({ path: `/en/${pr.id}/${snow.id}/${fsc2016p20med.id}` });

    cy.navigate(`/en/cart`);
    cy.wait('@projections');
    cy.get('.ui.container h1').should('contain', 'Cart');
    cy.get('.ui.container .ccl-container h2').should('contain', 'Empty cart');
    cy.get('li a.header-login-link strong').should('contain', '0');

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
    cy.wait(1000);

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
    cy.wait(100);

    // select a 8 days range
    cy.get('.react-datepicker__month .react-datepicker__week')
      .eq(1)
      .find('.react-datepicker__day')
      .eq(0)
      .click();
    cy.get('.react-datepicker__month .react-datepicker__week')
      .eq(2)
      .find('.react-datepicker__day')
      .eq(0)
      .click();
    cy.get('.react-datepicker__children-container button.ccl-button').should(
      'have.attr',
      'disabled',
    );

    // select a 3 days range
    cy.get('.react-datepicker__month .react-datepicker__week')
      .eq(1)
      .find('.react-datepicker__day')
      .eq(0)
      .click();
    cy.get('.react-datepicker__month .react-datepicker__week')
      .eq(1)
      .find('.react-datepicker__day')
      .eq(2)
      .click();
    cy.get('.react-datepicker__children-container button.ccl-button').should(
      'not.have.attr',
      'disabled',
    );
    //apply the date range
    cy.get('.react-datepicker__children-container button.ccl-button').click();
    cy.get('td.table-td-timeseries')
      .eq(0)
      .find('.info-icon')
      .eq(0)
      .find('button span')
      .should('not.contain', 'Select dates');

    // intercept the POST and check the body data
    cy.intercept('POST', '@datarequest_post', (req) => {
      expect(req.body.Datasets[0].TemporalFilter.EndDate).to.be.greaterThan(0);
      expect(req.body.Datasets[0].TemporalFilter.StartDate).to.be.greaterThan(
        0,
      );
    });

    // Select entire cart
    cy.get('td.table-td-checkbox div.ui.checkbox input').each(($checkbox) => {
      expect($checkbox.parent()).to.not.have.class('checked');
      $checkbox.click();
      expect($checkbox.parent()).to.have.class('checked');
    });

    // Download cart
    cy.get('a.ccl-button.ccl-button--default').click();
  });
});
