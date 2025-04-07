/// <reference types="Cypress" />

describe("/login", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
    // reset and seed the database prior to every test
    //cy.exec('npm run db:reset && npm run db:seed')

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    //cy.request('POST', '/test/seed/user', { email: 'bobblluser@bmail.com' })
    //.its('body')
    //.as('currentUser')
  });

  it("shows login screen", () => {
    cy.contains("Login");
  });

  it("links to sign up", () => {
    cy.contains("Sign Up").should("have.attr", "href", "/auth/sign-up");
  });

  it("links to forgot password", () => {
    cy.contains("Forgot Password").should(
      "have.attr",
      "href",
      "/auth/forgot-password"
    );
  });

  it("requires email & password", () => {
    cy.get("form").contains("Login").click();
    cy.get(".alerts").should(
      "contain",
      "You must provide an email and password"
    );
  });

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

  // also add it('navigates to profile page on login') when/if implemented
});
