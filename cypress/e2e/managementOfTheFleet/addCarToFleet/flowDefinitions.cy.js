export const validVIN = "WDD1690071J236589"

export function hasFleet() {
    return () => {
        cy.get('#fleetOverviewTable')
    }
}

export function addCarWithValidVIN() {
    return () => {
        if (Cypress.$(validVIN).length > 0) {
            cy.contains('td', validVIN)
            .siblings()
            .contains('delete')
            .click()
            cy.contains('td', validVIN).should('not.exist')
        }

        cy.get('#vinInput').type(validVIN)
        cy.get('#addCarToFleetButton').click()
    }
}

export function addCarWithInvalidVIN() {
    return () => {
        cy.contains('td', "invalidVIN").should('not.exist')
        cy.get('#vinInput').type("invalidVIN")
        cy.get('#addCarToFleetButton').click()
        cy.contains('td', "invalidVIN").should('not.exist')
    }
}

export function addCarWithExistingVIN() {
    return () => {
        var existingVIN = validVIN
        cy.get('#fleetOverviewTable').find("tr").then((tr) => {
            var numCars = tr.length;
            cy.contains('td', existingVIN).should('exist')
            cy.get('#vinInput').type(existingVIN)
            cy.get('#addCarToFleetButton').click()
            cy.contains('td', existingVIN).should('exist')
            cy.get('#fleetOverviewTable').find("tr").should('have.length', numCars)
        })
    }
}

export function addCarWithNotRegisteredVIN() {
    return () => {
        var existingVIN = "WDD1690071J236588"
        cy.get('#fleetOverviewTable').find("tr").then((tr) => {
            cy.contains('td', existingVIN).should('not.exist')
            cy.get('#vinInput').type(existingVIN)
            cy.get('#addCarToFleetButton').click()
            cy.contains('td', existingVIN).should('not.exist')
        })
    }
}
