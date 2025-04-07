declare namespace Cypress {
    interface Chainable<Subject = any> {
        isWithinViewport(): Chainable<any>;
      }

    interface Chainable<Subject = any> {
        isOutsideViewport(): Chainable<any>;
      }

    interface Chainable<Subject = any> {
        isInViewport(): Chainable<any>;
      }
  }