/// <reference types="cypress"/>

describe('Verify that user can edit profile settings', () => {

    beforeEach(() => {
        cy.visit('/devs');
        cy.login(user, pswrd);
        //store pswrd and login in fixtures
    });

    it('Profile picture is updated', () => {
        cy.uploadAvatar('cypress/fixtures/img/gif-fail.gif');
        
        cy.get('#client-snackbar')
            .should('contain', 'Unsupported file type');
        
        cy.uploadAvatar('cypress/fixtures/img/over1MB.png');
        
        cy.get('#client-snackbar')
            .should('contain', 'A file must be smaller than 1MB');

        cy.uploadAvatar('cypress/fixtures/img/avatar-success.jpg');
        
        //https://justjoin.it/api/developers/me/avatar = 200
        //https://justjoin.it/api/developers/me = avatar != null


        //cy.get('#file-upload[type="file"]').selectFile(''); //pic is updated

        //remove img and verify that it is removed
        cy.intercept('GET', 'https://justjoin.it/api/developers/me', {fixture: 'api_intercept.json'});
        cy.visit('/devs/panel/profile');

       // https://justjoin.it/api/developers/me 

       //avatar: null
    });

    it('User details are updated', () => {

    });

    it('CV can be uploaded', () => {
        //drag n drop
    });

    it('Optional fields - years of experience and github link', () => {

    });

});