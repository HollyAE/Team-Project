
describe("Open Modal", ()=> {
    it("clicks on job and opens modal then closes it", () => {
        cy.visit("/")

        cy.get("#listing").click()

        cy.get(".flex > .text-xl").isWithinViewport()

        cy.get("body").click(0,0)

        cy.get(":nth-child(4) > #listing > .h-96").isWithinViewport()
        
    })
})