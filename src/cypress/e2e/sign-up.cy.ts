/// <reference types="Cypress" />

describe("sign up", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-up");
  });

  it("shows sign up screen", () => {
    cy.contains("Let's get started");
  });

  it("requires all fields to be filled out", () => {
    cy.get("form").contains("Next").should("be.disabled");
    //cy.contains('Please check all fields are entered correctly')
    cy.get(".text-red-600");
  });

  it("signs new user up with valid input and navigates to home", () => {
    cy.get("#firstName").type("big");
    cy.get("#sname").type("bird");
    cy.get("#dob").type("2001-01-04");
    cy.get("#displayname").type("birdie");
    cy.contains("Next").click();
    cy.url().should("include", "/sign-up");
    cy.contains("One last thing...");
    //cy.contains('Sign Up').should('be.disabled') this is not in detailsform but should be
    cy.get("#email").type("user@bobbll.com");
    cy.get("#password").type("bigbird");
    cy.get("#confirm").type("bigbird");
    cy.contains("Sign Up").click();
    cy.url().should("include", "/");
  });
});
// reset and seed the database prior to every test
//cy.exec('npm run db:reset && npm run db:seed')

// seed a user in the DB that we can control from our tests
// assuming it generates a random password for us
//cy.request('POST', '/test/seed/user', { email: 'bobblluser@bmail.com' })
//.its('body')
//.as('currentUser')
/*
    when more specific input verification implemented (ie. specific checks for empty email field or empty password field)
    uncomment and and change error messages for above to reflect 

    it('requires password', () => {
        cy.get('[data-test=email]').type('user@bobbll.com')
        cy.get('.error-messages')
        .should('contain', 'Password cannot be blank')
    })
    */

/*
    another to add when fixed - unhandled firebase error

    it('requires valid login details', () => {
        cy.get('[data-test=email').type('user@bobbll.com')
        cy.get('[data-test=password').type('invalid{enter}')
        cy.get('.error-messages')
        .should('contain', 'email or password invalid')
    })
    */
