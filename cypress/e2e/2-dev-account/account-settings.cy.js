import users from '../../fixtures/users.json';
import { faker } from '@faker-js/faker';

describe('Verify that user can edit profile settings', () => {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const city = faker.address.city();
    const description = faker.word.noun();

    function submit(){
        cy.get('button[type="submit"').click({timeout: 5000});
        cy.visit('/devs/panel/profile');
    }
    
    beforeEach(() => {
        cy.visit('/devs');
        cy.login(users.user5, users.password);
    });

    it('Profile picture is updated', () => {
        //failed avatar uploads: unsupported format and file is too large:
        cy.uploadFile('#file-upload[type="file"]', 'cypress/fixtures/img/gif-fail.gif', 'Unsupported file type');
        cy.uploadFile('#file-upload[type="file"]', 'cypress/fixtures/img/over1MB.png', 'File must be smaller than 1MB');
        //pass:
        cy.uploadFile('#file-upload[type="file"]', 'cypress/fixtures/img/avatar-success.jpg', 'Successfuly updated Avatar');
    });

    it('User details are updated', () => {
        cy.get('input[name="firstName"]')
            .clear().type(firstName);
        cy.get('input[name="lastName"]')
            .clear().type(lastName);
        cy.get('input[name="city"]')
            .clear().type(city);
        cy.get('textarea[name="description"]')
            .clear().type(description);

        submit();
        //assert that values are properly saved
        cy.get('input[name="firstName"]')
            .should('have.attr','value', firstName);
        cy.get('input[name="lastName"]')
            .should('have.attr', 'value', lastName)
        cy.get('input[name="city"]')
            .should('have.attr', 'value', city);
        cy.get('textarea[name="description"]')
            .should('contain', description);
    });

    it('Linkedin link can be added', () => {
        //negative tests - only full linkedin link can be added
        cy.get('input[name="linkedinUrl"]')
            .clear().type('https://www.linkedin.com').blur();
        cy.get('.MuiFormHelperText-root.Mui-error')
            .should('contain', 'Please provide a valid LinkedIn profile url');

        cy.get('input[name="linkedinUrl"]')
            .clear().type('https://www.linkedin.com/in/ryanroslansky/');
        
        submit();

        cy.get('input[name="linkedinUrl"]')
            .should('have.attr', 'value', 'https://www.linkedin.com/in/ryanroslansky/');
    });

    it.only('CV can be uploaded', () => {
        //cv must be a pdf file
        cy.uploadFile('input[accept="application/pdf"]', 'cypress/fixtures/img/over1MB.png', 'CV must be a pdf file');
        //correct cv file
        cy.uploadFile('input[accept="application/pdf"]', 'cypress/fixtures/CV.pdf', 'Successfuly updated CV');
    });

    it('Years of experience can be chosen', () => {
        for(let i=0; i<6; i++){
            cy.get('.MuiButtonBase-root.MuiButton-root').eq(i).as('exp');
            cy.get('@exp').click();
            submit();
            cy.checkCSS('@exp', 'color', 'rgb(255, 64, 129)');
        };
    });

    it('Github link can be added', () => {
        cy.get('input[name="githubUrl"]')
            .clear().type('github.com');
        cy.get('.MuiFormHelperText-root.Mui-error')
            .should('contain', 'Please provide a valid Github profile url');

        cy.get('input[name="githubUrl"]')
            .clear().type('https://github.com/a');
        submit();
        cy.get('input[name="githubUrl"]')
            .should('have.attr', 'value', 'https://github.com/a');
    });

});