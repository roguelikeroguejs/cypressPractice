import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () =>{
    beforeEach('open application', () =>{
        cy.openHomePage()
    })
    it('verify navigation across the pages', () =>{
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.toastrPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()

    })

    it.only('should submit Inline and Basic form and select tommorrow date in the calendar', () =>{
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bodnar')
        onSmartTablePage.updateAgeByFirstName('Artem', '25')
        onSmartTablePage.deleteRowByIndex(1)


    })
})