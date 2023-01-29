import * as common from "../../commonActions.cy"
import * as flows from "./flowDefinitions.cy"


describe('Add Car to Fleet: Main Flow', () => {
    it('Opens application', common.openApplication())

    it('Logs in as fleet manager', common.logInAs(common.actors.FLEET_MANAGER))

    it('Navigates to fleet overview', common.navigateTo(common.pages.FLEET_OVERVIEW))

    it('Precondition: System has a fleet registered for the actor', flows.hasFleet())

    it('Adds a new car to the fleet by providing the VIN', flows.addCarWithValidVIN())

    it('Postcondition: The car with the given VIN is added to the fleet', () => {
        cy.contains('td', flows.validVIN).should('exist')
    })

    it('Postcondition: Static car data on the car with the given VIN is saved', () => {
        cy.contains('td', flows.validVIN).should('exist')
    })
})

describe('2a Add Car to Fleet: Given VIN is invalid', () => {
    it('Opens application', common.openApplication())

    it('Logs in as fleet manager', common.logInAs(common.actors.FLEET_MANAGER))

    it('Navigates to fleet overview', common.navigateTo(common.pages.FLEET_OVERVIEW))

    it('Precondition: System has a fleet registered for the actor', flows.hasFleet())

    it('Adds a new car to the fleet by providing the VIN', flows.addCarWithInvalidVIN())
})

describe('2b Add Car to Fleet: A car with the given VIN is already present in the fleet', () => {
    it('Opens application', common.openApplication())

    it('Logs in as fleet manager', common.logInAs(common.actors.FLEET_MANAGER))

    it('Navigates to fleet overview', common.navigateTo(common.pages.FLEET_OVERVIEW))

    it('Precondition: System has a fleet registered for the actor', flows.hasFleet())

    it('Adds a new car to the fleet by providing the VIN', flows.addCarWithExistingVIN())
})

describe('3a System detects failure with the communication', () => {
    it('Opens application', common.openApplication())

    it('Logs in as fleet manager', common.logInAs(common.actors.FLEET_MANAGER))

    it('Shows error page', () => {
        cy.intercept('GET', common.backendUrl + '/**', {
            statusCode: 502,
            body: {
              name: 'Peter Pan',
            },
          })
        
        common.navigateTo(common.pages.FLEET_OVERVIEW)
        cy.contains("Something went wrong")
    })

    it('Navigates to fleet overview', common.navigateTo(common.pages.FLEET_OVERVIEW))
})

describe('3b Connected car system does not have a car with the given VIN', () => {
    it('Opens application', common.openApplication())

    it('Logs in as fleet manager', common.logInAs(common.actors.FLEET_MANAGER))

    it('Navigates to fleet overview', common.navigateTo(common.pages.FLEET_OVERVIEW))

    it('Precondition: System has a fleet registered for the actor', flows.hasFleet())

    it('Adds a new car to the fleet by providing the VIN', flows.addCarWithNotRegisteredVIN())
})
