// unhandled firebase error user not found

describe("forgot password", () => {
  beforeEach(() => {
    cy.visit("/auth/forgot-password");
  });

  it("shows forgot password screen", () => {
    cy.contains("Reset Password");
  });

  it("requires all fields to be filled out", () => {
    cy.contains("Send Reset Password Email").click();
    cy.get(".text-red-600");
  });

  it("navigates to home page on valid sign up click", () => {
    cy.get("#email").type("user@bobbll.com");
    cy.contains("Send Reset Password Email").click();
    cy.url().should("include", "/");
  });
});
