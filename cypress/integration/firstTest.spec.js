/// <reference types="cypress"/>

const { table } = require("console")
const { isYieldExpression } = require("typescript")

describe('Our First Suite', ()=> {

    it('first test', () => {

        //opens the URL--Because the URL to app is defined in cypress.json only need a /

        cy.visit('/')

        //Click on Forms
        cy.contains('Forms').click()

        //Click on Forms Layout
        cy.contains('Form Layouts').click()

        //Locators 
        //By Tag Name  
        cy.get('input')

        //By ID, needs a # before the ID
        cy.get('#inputEmail1')

        //By Class Name, needs a . before the class name
        cy.get('.input-full-width')

        //By Attribute name, must be in []
        cy.get('[placeholder]')

        //By Attribute Name and Value, must be in [] and need to add value in "" after a =
        cy.get('[placeholder="Email"]')

        //By Class Value, entire string
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //By Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //By two or more different attributes
        cy.get('[placeholder="Email"][type="email"]')

        //By tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The way cypress recommends--by using your own attributes
        cy.get('[data-cy="imputEmail1"]')

    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Created a locator by searching the web page in IDE, finding the right button and then adding our own locator
        cy.get('[data-cy="signInButton"]')

        //When searching by text like below always look for exact text, it will use the first match 

        cy.contains('Sign in')

        //If you want to find the second occurence, you can add a unique attribute found on the element 
        cy.contains('[status="warning"]','Sign in')

        //If you can't find anything unique about the element look for something eles unique to the section, but you need to find a parent element to get here
       //Need to go up to parent to be able to drill down (cypress looks for a parent command before it can access the right  child ), this is how you travel through the DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in') 
            .parents('form')
            .find('nb-checkbox')
            .click() 

        cy.contains('nb-card','Horizontal form').find('[type="email"]')



    })

    it('then and wrap methods', ()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        //cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        //cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //cypress method of using variables because cypress is asynchronous 
        
        cy.contains('nb-card', 'Using the Grid').then(gridForm => {
            //The following variables are saved using JQuery (hover over find and text methods) 
            //When using JQuery you can't use cypress methods like click, have to use child libraries
            const emailLabelFirst = gridForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = gridForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            //Example: Say we want to assert that the label for Password in Using the Grid matches the label Password in Basic form 
            //and assert that the label Email in Using the grid does not equal Email address in the Basic form
            //Const must be nested in order to be accessible
            cy.contains('nb-card', 'Basic form').then(basicForm =>{
                const emailLabelSecond = basicForm.find('[for="exampleInputEmail1"]').text()
                const passwordLabelSecond = basicForm.find('[for="exampleInputPassword1"]').text()
                expect(emailLabelFirst).to.not.equal(emailLabelSecond)
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)
                // To switch context from JQuery back to cypress (so you can use cypress methods like should)
                cy.wrap(basicForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })
        })


    })

    it('invoke command', () =>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[for="exampleInputEmail1"]').invoke('text').then (text => {
            expect(text).to.equal('Email address')
        })
        // Scenario: verify that the checkbox is checked in the basic form by using invoke to look for the class attribute and assert using should method   
        //cy.contains('nb-card', 'Basic form')
        //    .find('nb-checkbox')
        //    .click()
        //    .find('.custom-checkbox')
        //    .invoke('attr', 'class')
        //    .should('contain', 'checked')

        //Scenario: verify that the checkbox is checked in the basic form by storing the class value as a param and using expect method to assert 
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .then(classValue =>{
                expect(classValue).to.contain('checked')
            })
    })
    //Scenario asserting that the property of a datepicker is a certain date after selecting a date from the calendar
    //Update this test to be more robust DON'T USE HARDCODED DATES
    it ('assert property', () => {
        function selectDayFromCurrent(day){
            date.setDate(date.getDate() + day)
            //We'll also need to know the current month and day 
            let futureDay = date.getDate()
            let futureYear = date.getFullYear()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+ ' '+futureDay+', '+futureYear
            cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click() 
                    //Functions can call themselves and create a while loop 
                    selectDayFromCurrent(day)
    
                } else{
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
    
                }
            })
            return dateAssert

        }
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
    //Use the Date object to get the current date and time from the system
        let date = new Date()
    //get date + (a number) will grab the future date but it need to be in date format so 
    //date.setDate() must be used to cast it into the correct format 
    
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>{
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(5)
           
            //Assert that the correct date is in the Datepicker 
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

        })       
        //   cy.get('nb-calendar-day-picker').contains(futureDay).click()
         
    })
    //Scenario verify a series of radio buttons 
    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
            //First Grabs the first element in the list of radio buttons can also look by index by using .eq(0)
            .first()
            // Using Force true allows you to bypass cypress if visible assertion, in this case the radio button has visibility-hidden attribute in the DOM before checking it 
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons)
            //Select the second radio button by selecting index 1
            .eq(1)
            .check({force: true})
            
            //Verify after selecting the second radio button that the first one becomes unchecked
            cy.wrap(radioButtons)
            .eq(0)
            .should('not.be.checked')

            //Verify that the third radio button is disabled 
            cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')
        })
    })
    it('check boxes', () =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click() 
        //Check command will only check unchecked boxes; it will not uncheck checked boxes use .click command to uncheck boxes
        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})

        cy.get('[type="checkbox"]').eq(0).should('not.be.checked')



    })
    it('lists and dropdowns', () =>{
        cy.visit('/')
        // 1 select a different theme and verify that the background color changes as well as the name of the theme
        //cy.get('nav nb-select').click()
       // cy.get('.options-list').contains('Dark').click()
        //cy.get('nav nb-select').should('contain', 'Dark')
        //cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //2 use a loop to go through each theme and verify the theme changes 
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            // Here .each is a for each loop, we go through each option and store the them text as a list item
            cy.get('.options-list nb-option').each((listItem, index) =>{
                //Use trim to removeextra whitespace 
                const itemText = listItem.text().trim()

                //Create a JSON object to store rgb values for each theme
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

               
                //Click on each theme in the list
                cy.wrap(listItem).click()
                //Confirm the text of the dropdown
                cy.wrap(dropdown).should('contain', itemText)
                //Verify the background color for each theme matches the what is in our colors JSON object 
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                //Click on the next theme in the dropdown
                if(index < 3 ){
                    cy.wrap(dropdown).click()
                }
               

            })
        })


    })
    it ('web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        // Scenario: we want to automate updating Larry's age from 18 to 25 and verify the update

        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            //Use the clear method do delete the current value of 18 before typing 25 or else the age field 
            //would appear as 1825
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click() 
            //No unique identifiers in DOM so either add your own (but the table is dynamic) 
            //so instead we use the table index, In the DOM you can see there are 7 rows so index
            //would be 6 
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')

        })

        //Scenario: add a new row with data and save it, then verify the changes  
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
           cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
           cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bodnar')
           cy.wrap(tableRow).find('.nb-checkmark').click()

        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain','Artem')
            cy.wrap(tableColumns).eq(3).should('contain','Bodnar')
        })
        //Test Table search filter functions work 
        const age = [20, 30, 40, 200]
        cy.wrap(age).each(age =>{
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow =>{
                if(age == 200){
                    cy.wrap(tableRow).should('contain','No data found')
                }else {

                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            }
            })
       
        })  


    })
    // Scenario is asserting a tooltip
    //Cypress works well with apps when you can click to trigger the tooltip or use a mouseover event, does not work well 
    //when the app only shows a tooltip on hover
    it('tooltip', () => { 
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')


    })
    it('browser dialog', () =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // Scenario a dialog box is fired from the browser so it is not in the DOM & not visible in cypress
        
        //1 Bad approach because the confirmation will happen regardless; you can miss the actual dialog
        cy.get('tbody tr').first().find('.nb-trash').click() 
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')

        })

        // 2 Cypress Auto confirms these type of dialogs but say you want to cancel 

        cy.get('tbody tr').first().find('.nb-trash').click() 
        cy.on('window:confirm', () => false)

        // 3 Cleaner approach that will actual assert the dialog box
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then( () =>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })


    })
})
