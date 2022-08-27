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


const domainName = '@ycodvf9q.mailosaur.net';
const emailPrefix = faker.word.adjective();
const signUpEmail = emailPrefix + domainName;

Cypress.Commands.add('submitEmail', () => {
    cy.get('input[type="email"]').type(signUpEmail);
})



Cypress.Commands.add('createAccount', (emailProvided, acceptTOS) => {
    if (emailProvided) {
        cy.submitEmail();
    } 
    
    if (acceptTOS) {
        cy.get('[name="acceptTerms"][type="checkbox"').check();
    }
    cy.get('button[type="submit"]').click();
})