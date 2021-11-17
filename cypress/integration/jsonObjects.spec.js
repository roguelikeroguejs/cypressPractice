 /// <reference types="cypress"/>

 describe('JSON objects', () => {

    it('JSON objetcs', () =>{
        cy.openHomePage()

        const simpleObject ={"key" : "value", "key2" : "value2"}

        const simpleArrayOfValues = ["one", "two", "three"]

        const arrayOfObjects = [{"key" : "value"},{"key2" : "value2"},{"key3" : "value3"}]

        const typesOfData = {"string": "this os a string", "number": 10 }

        const mixtureOfData = {
            "FirstName": "Artem",
            "LastName": "Bodnar",
            "Age": 35,
            "Students": [
                {
                    "firstName": "Sara",
                    "lastName": "Conor"

                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }
        //Get the vaules of keys dsiplayed in the console
        console.log(simpleObject.key)
        console.log(simpleObject.key2)

        console.log(simpleObject["key"])
        console.log(simpleObject["key2"])

        //Get Data from the array, need to supply an index
        console.log(simpleArrayOfValues[1])
        //Get the value of the third key from the arrayOfObjects
        console.log(arrayOfObjects[2].key3)

        //Get the first name of the first student from the mixtureOfData object
        console.log(mixtureOfData.Students[0].firstName)
        console.log(mixtureOfData.Students[0].lastName)
        console.log(mixtureOfData.Students[1].firstName)
        console.log(mixtureOfData.Students[1].lastName)

        const lastNameOfSeconStudent = mixtureOfData.Students[1].lastName



    })
 })

