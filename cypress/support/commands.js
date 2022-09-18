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
import { faker } from '@faker-js/faker';
import 'cypress-mailosaur';

const serverId = 'ycodvf9q';
const domainName = '@' + serverId +'.mailosaur.net';
const emailPrefix = faker.word.adjective();
const signUpEmail = emailPrefix + domainName;
const password = 'Qwertyui!1';

let confirmSignUp;


Cypress.Commands.add('submitEmail', () => {
    cy.get('input[type="email"]').type(signUpEmail);
});

Cypress.Commands.add('createAccount', (emailProvided, acceptTOS) => {
    if (emailProvided) {
        cy.submitEmail();
    } 
    
    if (acceptTOS) {
        cy.get('[name="acceptTerms"][type="checkbox"').check();
    }

    cy.get('button[type="submit"]').click();

});

Cypress.Commands.add('checkMessage', (emailSubject) => {
    cy.mailosaurGetMessage(serverId, {
        sentTo: signUpEmail}).then(email => {
            expect(email.subject).to.equal(emailSubject);
            confirmSignUp = email.html.links[1].href;
            cy.visit(confirmSignUp);
            cy.get('input[type="password"]').type(password);
            cy.get('[type="submit"]').click();
    });
});

Cypress.Commands.add('login', (user, pswrd) => {
    cy.get('input[type="email"]')
        .type(user);
    cy.get('input[type="password"]')
        .type(pswrd);
    cy.get('button[type="submit"]')
        .click();
});

Cypress.Commands.add('uploadAvatar', (path) => {
    cy.get('#file-upload[type="file"]')
        .selectFile(path, {force: true});
});

Cypress.Commands.add('checkCSS', (locator, type, colour) => {
    cy.get(locator)
        .should('have.css', type, colour)
});