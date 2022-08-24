/// <reference types="cypress" />

describe('Verify that dark mode is working correctly', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Light mode is set as the default mode' ,() => {
        cy.get('#logo-justjoin-it').should('have.css', 'fill', 'rgb(55, 71, 79)'); 
        cy.get('header > div').should('have.css', 'background-color', 'rgb(255, 255, 255)');
        cy.screenshot({capture: 'fullPage'});
    });

    it('Background and font colours are correct for the dark mode' ,() => {
        cy.get('[type="checkbox"]').eq(0).check();
        cy.get('#logo-justjoin-it').should('have.css', 'fill', 'rgba(255, 255, 255, 0.8)'); 
        cy.get('header > div').should('have.css', 'background-color', 'rgb(44, 44, 44)');
        cy.screenshot({capture: 'fullPage'});
    });

    it('Dark mode is enabled in all tabs' ,() => {
        cy.get('[type="checkbox"]').eq(0).check();

        cy.visit('/brands');
        cy.get('#logo-justjoin-it').should('have.css', 'fill', 'rgba(255, 255, 255, 0.8)'); 
        cy.get('header > div').should('have.css', 'background-color', 'rgb(44, 44, 44)');

        cy.visit('https://geek.justjoin.it/');
        cy.get('#masthead').should('have.css', 'color', 'rgb(68, 68, 68)');

        cy.visit('/matchmaking');
        cy.get('#logo-justjoin-it').should('have.css', 'fill', 'rgba(255, 255, 255, 0.8)'); 
        cy.get('header > div').should('have.css', 'background-color', 'rgb(44, 44, 44)');

        cy.visit('/add-offer'); //test fails - bug found
        cy.get('#logo-justjoin-it').should('have.css', 'fill', 'rgba(255, 255, 255, 0.8)'); 
        cy.get('header > div').should('have.css', 'background-color', 'rgb(44, 44, 44)');
    });

    it('Pop-ups are displayed in dark mode', () => {
        cy.get('[type="checkbox"]').eq(0).check();

        cy.get('button').contains('Sign in').click({timeout: 3000}); //'Sign in' pop-up
        cy.get('div[class^="MuiPaper-root"], [class^="MuiPopover-paper"]').eq(1).as('popover');
        cy.get('@popover').should('be.visible').and('have.css', 'background-color', 'rgb(44, 44, 44)');
        cy.get('body').click(0,0);

        cy.get('.css-plb9h9 > button').click({timeout: 3000}); //'Locations' filter pop-up
        cy.get('@popover').should('be.visible').and('have.css', 'background-color', 'rgb(44, 44, 44)');
        cy.get('body').click(0,0);

        cy.get('button').contains('PLN').click({timeout: 3000}); //'Currency' pop-up
        cy.get('@popover').should('be.visible').and('have.css', 'background-color', 'rgb(44, 44, 44)');
        cy.get('body').click(0,0);
        
        cy.get('[d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"]').parentsUntil('button').eq(1).click({timeout: 3000}); // sidebar pop-up
        cy.get('@popover').should('be.visible').and('have.css', 'background-color', 'rgb(44, 44, 44)');
    });

});