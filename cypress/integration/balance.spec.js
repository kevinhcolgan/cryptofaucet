describe ('Balance update test', () => {
    it ('Loads the page and check that balance updates after a short while', () => {
        const preloadText = '-'.trim();
        cy.visit ('/');

        //test that the balance is initially empty then check that it returns a valid value after it loads
        //.get('.balance').invoke('text').should('have.value',text);
        cy.get('.balance').invoke('text').then((text => {
            expect(text.trim()).to.eq(preloadText);
        }));

        //wait 2 secs and then check if balance has been added
        cy.wait(2000);

        cy.get('.balance').invoke('text').then((text => {
            expect(text.trim()).not.to.eq(preloadText);
        }));
    });
});