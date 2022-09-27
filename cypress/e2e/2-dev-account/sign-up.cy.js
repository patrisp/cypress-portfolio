import { faker } from '@faker-js/faker';
import 'cypress-mailosaur';
import users from '../../fixtures/users.json';

describe('Verify that user can create a new account via email', () => {
    const serverId = 'tesbmwik';
    const domainName = '@' + serverId +'.mailosaur.net';
    const emailPrefix = faker.word.adjective();
    const signUpEmail = emailPrefix + domainName;

    let confirmSignUp;

    function loggingIn(email, tos){
        if(email){
            cy.get('input[type="email"]').type(signUpEmail);
        }
        if(tos){
            cy.get('[name="acceptTerms"][type="checkbox"]').check();
        }
        cy.get('button[type="submit"]').click();
    };

    beforeEach(() => {
        cy.visit('/devs/signup');
    });

    it('Email is a required field', () => {
        loggingIn(false, true);

        cy.get('p.Mui-error')
            .should('exist')
            .and('contain.text', 'Email is a required field');
    });

    it('User needs to accept ToS in order to create the account', () => {
        loggingIn(true, false);

        cy.get('.MuiTypography-root.MuiFormControlLabel-label')
            .children()
            .should('have.css', 'color', 'rgb(244, 67, 54)');
    });

    it('Requirements are met - email is sent and the message is displayed', () => {
        loggingIn(true, true);
        
        cy.mailosaurGetMessage(serverId, {
            sentTo: signUpEmail
        }).then(email => {
            expect(email.subject).to.equal('Confirmation account link');
            confirmSignUp = email.html.links[1].href;
        });
    });

    it('Account is confirmed by the new user', () => {
        cy.visit(confirmSignUp);
        cy.get('input[type="password"]').type(users.password);
        cy.get('button[type="submit"]').click();
    });
});