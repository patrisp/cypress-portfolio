/// <reference types="cypress" />

import '../../support/commands.js'

describe('Verify that user can create a new account via email', () => {
    
    const serverId = 'ycodvf9q';
    const domainName = '@ycodvf9q.mailosaur.net';
    //const emailPrefix = faker.word.adjective();
    //const signUpEmail = emailPrefix + domainName;
    const password = 'Qwertyui!1'

    let confirmSignUp;

    beforeEach(() => {
        cy.visit('/devs/signup');
    });

    it('Email is a required field', () => {
        cy.createAccount(false, true);
        cy.get('p.Mui-error')
            .should('exist')
            .and('contain.text', 'Email is a required field');
    });

    it('User needs to accept ToS in order to create the account', () => {
        cy.createAccount(true, false);
        cy.get('.MuiTypography-root.MuiFormControlLabel-label')
            .children()
            .should('have.css', 'color', 'rgb(244, 67, 54)');
    });

    it.only('Requirements are met - email is sent and the message is displayed', () => {
        cy.createAccount(true, true);

        cy.mailosaurGetMessage(serverId, {
            sentTo: signUpEmail
        }).then(email => {
            expect(email.subject).to.equal('Confirmation account link');
            confirmSignUp = email.html.links[1].href;
        });
    });

    it('Account is confirmed by the new user', () => {
        cy.visit(confirmSignUp);
        cy.get('input[type="password"]').type(password);
        cy.get('[type="submit"]').click();
    });

    
});