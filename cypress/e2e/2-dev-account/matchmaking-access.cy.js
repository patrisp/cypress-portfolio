import users from '../../fixtures/users.json';

describe('Verify that users have access to Matchmaking if requirements are met ', ()=>{

    function popupMessage(profileInfo, preferencesInfo){
        cy.visit('/devs/panel/matchmaking');
        cy.get('[role="dialog"]')
            .children()
            .should('contain', 'To use our Matchmaking feature we need you to fill up missing informations about you.')
            .and('contain', profileInfo)
            .and('contain', preferencesInfo);
    };
        
    beforeEach(()=>{
        cy.visit('/devs');
    });

    afterEach(()=>{
        cy.logout();
    });

    it('Pop-up is displayed if neither user profile nor preferences are completed', ()=>{
        cy.login(users.user1, users.password); 
        
        popupMessage('Complete your profile to apply through matchmaking','Fill preferences to see your job matches');
        });

    it('Pop-up is displayed if only user profile is completed', ()=>{
        cy.login(users.user2, users.password); 

        popupMessage('Your profile is complete!','Fill preferences to see your job matches');
        });

    it('Pop-up is displayed if only preferences are completed', ()=>{
        cy.login(users.user3, users.password); 

        popupMessage('Complete your profile to apply through matchmaking','Your matchmaking preferences are complete!');
        });

    it('Pop-up is not displayed if user profile and preferences are completed', ()=>{
        cy.login(users.user4, users.password); 

        cy.visit('/devs/panel/matchmaking');

        cy.get('.MuiGrid-root.MuiGrid-container')
            .children()
            .should('contain', 'Berlin')
            .and('contain', '0k - 100k PLN')
            .and('contain', 'Java')
            .and('contain', 'Yes');
    });
});