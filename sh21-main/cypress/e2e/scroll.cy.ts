describe("Test job collection scroll", () => {
    it("should scroll through the jobs", () => {
        cy.visit("/")

        cy.get(":nth-child(9) > #listing > .h-96").scrollIntoView()
        
        cy.get(":nth-child(9) > #listing > .h-96").isWithinViewport()

    })
})

describe("Test chevron buttons scroll", () => {
    it("should scroll through the jobs", () => {
        cy.visit("/")

        cy.get(":nth-child(2) > div > .h-6").click()

        cy.get(":nth-child(2) > div > .h-6").click()

        cy.get(":nth-child(9) > #listing > .h-96").isWithinViewport()

    })
})