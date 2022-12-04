// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//close cookies information pop-up

Cypress.Commands.add('submitEmail', () => {
    cy.get('input[type="email"]').type(signUpEmail);
});

Cypress.Commands.add('login', (user, pswrd) => {
    cy.intercept('/api/developers/auth')
        .as('auth');
    cy.get('input[type="email"]')
        .type(user);
    cy.get('input[type="password"]')
        .type(pswrd);
    cy.get('button[type="submit"]')
        .click();
    cy.wait('@auth');
});

Cypress.Commands.add('uploadAvatar', (path) => {
    cy.get('#file-upload[type="file"]')
        .selectFile(path, {force: true}, {timeout: 5000});
});

Cypress.Commands.add('checkCSS', (locator, type, colour) => {
    cy.get(locator)
        .should('have.css', type, colour)
});

Cypress.Commands.add('logout', ()=>{
    cy.visit('/devs/panel/profile');
    cy.get('.MuiListItem-root')
        .contains('Log out')
        .click({timeout: 3000});
    cy.url().should('eq', 'https://justjoin.it/devs');
});


Cypress.Commands.add('verifyMessageAfterFileUpload', (selector, file, msg)=>{
    cy.get(selector)
        .selectFile(file, {force: true}, {timeout: 5000});

    cy.get('.MuiSnackbarContent-message')
        .should('contain', msg);

    cy.intercept('GET', 'https://justjoin.it/api/developers/me', {fixture: 'api_intercept.json'});
    cy.visit('/devs/panel/profile');
});