const faucetConstants = require('../../src/lib/faucet_constants');


describe ('Faucet request test', () => {
    it ('submits the faucet form with an invalid ID and checks that an error message is returned', () => {
        const invalidAddress = 'olaisjdf9sdufs';
        cy.visit ('/');

        //Cypress doens't support fetch yet, so just use wait instead
        cy.server()
        //cy.route('/api/sendCrypto*').as('sendCrypto')

        cy.get('input[name="address"]').type(invalidAddress).should('have.value', invalidAddress);
        cy.get('button[type=submit]').click();

        //wait for server to respond
        /*
        cy.wait('@sendCrypto').then((xhr) => {
            // we can now access the low level xhr
            // that contains the request body,
            // response body, status, etc
        })
        */
        cy.wait(3000);

        //check that the statusCode returned is invalid
        cy.get(`.formElement.status-message.${faucetConstants.APP_STATUS.TX_FAILED}`).should('exist');
    });
    it ('submits the faucet form with a valid ID and checks that a success message is returned', () => {
        const validAddress = '2N2JyUCeF585KraRbykBG6ZxkfCM6Vz5YKw';
        cy.visit ('/');

        //Cypress doens't support fetch yet, so just use wait instead
        cy.server()
        //cy.route('/api/sendCrypto*').as('sendCrypto')

        cy.get('input[name="address"]').type(validAddress).should('have.value', validAddress);
        cy.get('button[type=submit]').click();

        //wait for server to respond
        /*
        cy.wait('@sendCrypto').then((xhr) => {
            // we can now access the low level xhr
            // that contains the request body,
            // response body, status, etc
        })
        */
        cy.wait(12000);

        //check that the statusCode returned is valid
        cy.get(`.formElement.status-message.${faucetConstants.APP_STATUS.TX_SUCCESS}`).should('exist');
    });
});