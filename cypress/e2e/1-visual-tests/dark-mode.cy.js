describe('Verify that dark mode is working correctly', () => {
    function enableDarkMode(){
        cy.get('[type="checkbox"]').eq(0).check();
    };

    function checkIfLightCSS(){
        cy.checkCSS('#logo-justjoin-it', 'fill', 'rgb(55, 71, 79)');
        cy.checkCSS('header > div', 'background-color', 'rgb(255, 255, 255)');
    };

    function checkIfDarkCSS(){
        cy.checkCSS('#logo-justjoin-it', 'fill', 'rgba(255, 255, 255, 0.8)');
        cy.checkCSS('header > div', 'background-color', 'rgb(44, 44, 44)');
    };

    beforeEach(() => {
        cy.visit('/');
    });

    it('Light mode is set as the default mode' ,() => {
        checkIfLightCSS();
        cy.screenshot({capture: 'fullPage'});
    });

    it('Background and font colours are correct for the dark mode' ,() => {
        enableDarkMode();
        checkIfDarkCSS();
        cy.screenshot({capture: 'fullPage'});
    });

    it('Dark mode is enabled in all tabs' ,() => {
        enableDarkMode();

        cy.visit('/brands');
        checkIfDarkCSS();

        cy.visit('https://geek.justjoin.it/');
        cy.checkCSS('#masthead', 'color', 'rgb(68, 68, 68)');

        cy.visit('/matchmaking');
        checkIfDarkCSS();

        cy.visit('/add-offer'); //test fails - bug found
        checkIfDarkCSS();
    });

    it('Pop-ups are displayed in dark mode', () => {
        enableDarkMode();

        cy.get('button')
            .contains('Sign in').click({timeout: 3000}); //'Sign in' pop-up
        cy.get('div[class^="MuiPaper-root"], [class^="MuiPopover-paper"]')
            .eq(1).as('popover');
        cy.checkCSS('@popover', 'background-color', 'rgb(44, 44, 44)');
        cy.get('body').click(0,0);

        cy.get('.css-plb9h9 > button').click({timeout: 3000}); //'Locations' filter pop-up
        cy.checkCSS('@popover', 'background-color', 'rgb(44, 44, 44)');
        cy.get('body').click(0,0);

        cy.get('button')
            .contains('PLN').click({timeout: 3000}); //'Currency' pop-up
        cy.checkCSS('@popover', 'background-color', 'rgb(44, 44, 44)');
        cy.get('body').click(0,0);
        
        cy.get('[d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"]')
            .parentsUntil('button')
            .eq(1).click({timeout: 3000}); // sidebar pop-up
        cy.checkCSS('@popover', 'background-color', 'rgb(44, 44, 44)');
    });

});