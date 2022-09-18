/// <reference types = "cypress"/>

describe('Verify that UI elements are correctly displayed in responsive view', () => {

    const compareSnapshotCommand = require('cypress-image-diff-js/dist/command');
    compareSnapshotCommand();

    function compareVisual(viewport, fileName){
        cy.viewport(viewport);
        cy.get('body')
            .compareSnapshot(fileName);
    };

    beforeEach(()=> {
        cy.visit('/devs');
    });

    it('Sign in page is displayed properly on mobile devices', () => {
        compareVisual('iphone-se2','iPhoneSESignIn');
        compareVisual('iphone-8', 'iPhone8SignIn');
        compareVisual('samsung-s10', 'samsungs10SignIn');
    });

    it('Menu sidebar is displayed properly on mobile devices', () => {
        cy.get('button.MuiIconButton-root-74').click();

        compareVisual('iphone-se2', 'iPhoneSEMenu');
        compareVisual('iphone-8', 'iPhone8Menu');
        compareVisual('samsung-s10', 'samsungs10Menu');
    });
});