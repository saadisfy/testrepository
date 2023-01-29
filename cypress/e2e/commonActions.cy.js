export const ccsAppUrl = "http://cm-uiccsappweb.cloud.iai.kit.edu";
export const backendUrl = "http://a-fleetmangement-authz.de-c1.cloudhub.io";
export const actors = {
    FLEET_MANAGER: "Fleet Manager",
    CUSTOMER: "Customer"
}
export const pages = {
    FLEET_OVERVIEW: "Fleet Overview"
}

export function openApplication() {
    return () => {
        cy.visit(ccsAppUrl)
    }
}

export function logInAs(actor) {
    return () => {
        switch (actor) {
            case actors.FLEET_MANAGER:
                cy.contains(actors.FLEET_MANAGER).click()
                break
            case actors.CUSTOMER:
                cy.contains(actors.CUSTOMER).click()
                break
        }
    }
}

export function navigateTo(page) {
    return () => {
        switch (page) {
            case pages.FLEET_OVERVIEW:
                cy.contains(pages.FLEET_OVERVIEW).click()
                cy.url().should('include', '/fleet-overview')
                break
        }
    }
}
