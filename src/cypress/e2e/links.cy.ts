describe("Visits Homepage", () => {
  it("visits the homepage", () => {
    cy.visit("/")
  })
})



describe("Navigate to Build-CV", () => {
  it("click build-cv link from homepage", () => {
    cy.visit("/")

    cy.contains("Build CV").click()

    cy.url().should("include", "/build-cv")
  })
})

describe("Navigate to Discover", () => {
  it("click discover link from homepage", () => {
    cy.visit("/");

    cy.contains("Discover Companies").click()

    cy.url().should("include", "/discover")
  })
})

describe("Navigate to Homepage", () => {
  it("click Bobbll link to return to homepage", () => {
    cy.visit("/build-cv")

    cy.contains("Bobbll").click()

    cy.url().should("include", "/")
  })
})


//will finish this!
/*
describe("Navigate to Bobbll Business", () => {
  it("click \"for cool employers\" link", () => {
    cy.visit("/")

    cy.contains("For cool employers").click()

    cy.url().should("include", "https://business.bobbll.com/login")
    
  })
})
*/
