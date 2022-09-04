/// <reference types="cypress" />

describe("payment", () => {
  it("user can make payment", () => {
    cy.visit("/");

    // Login
    // Cypress can be extended with Cypress Testing Library; note that it can only use the `findBy*` queries
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    // using cy.get:
    cy.get('input[name="password"]').type("s3cret");
    cy.findByRole("button", { name: /sign in/i }).click();

    // Check balance
    // Using async/await is not recommended in cypress, but `cy` is a thenable object so use it like a Promise
    // Also, every chainable methods in Cypress recieves the queried element as *JQuery elements* so you can e.g. access its text content by element.text()
    let oldBalance;
    cy.get("[data-testid=sidenav-user-balance]").then(($balance) => {
      oldBalance = $balance.text();
    });

    // Click on 'New' button
    cy.find;
  });
});
