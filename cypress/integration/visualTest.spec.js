//Test uses the cypress-plugin-snapshots plugin for Visual Testing

describe('Visual test', () =>{

    it('should test snapshot', () =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        /* Update this Sign in button spacing from 3 to 6 to see visual 
          snaphot diff detected cause this check to fail, snapshots are stored in 
          __image_snapshots__ 
             <div class="offset-sm-6 col-sm-9">
              <button type="submit" nbButton status="primary" data-cy="signInButton">Sign in</button>
            </div> 
        */
        
        cy.contains('nb-card', 'Using the Grid').then(gridForm => {
            //Snapshot of just the Using the Grid section
            cy.wrap(gridForm).toMatchImageSnapshot()

            //Snapshot of the whole page
            cy.document().toMatchImageSnapshot()
        })

    })
})