export class FormLayoutsPage{

    submitInlineFormWithNameAndEmail(name, email){
        cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="Checkbox"]').check({force:true})
            //Cypress method to submit forms... Only usable on form elements
            cy.wrap(form).submit()

        })
    }

    submitBasicFormWithEmailAndPassword(email, password){
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="Checkbox"]').check({force:true})
            cy.wrap(form).submit()
        })
        
    }

    

} 

export const onFormLayoutsPage = new FormLayoutsPage() 