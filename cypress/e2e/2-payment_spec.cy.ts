import { v4 as uuidv4 } from "uuid";

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
    let oldBalance: string;
    cy.get("[data-testid=sidenav-user-balance]").then(($balance) => {
      oldBalance = $balance.text();
    });

    // Click on 'New' button
    cy.findByRole("button", { name: /new/i }).click();
    // Choose a user
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    // Pay
    const paymentAmount = "300.00";
    cy.findByLabelText(/amount/i).type(paymentAmount);
    const note = uuidv4();
    cy.findByLabelText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    // Go to find our payment entry
    cy.findByRole("button", { name: /return to transactions/i }).click();
    cy.findByRole("tab", { name: /mine/i }).click();
    // Cypress ALWAYS scroll an ACTIONED element into view before the action is performed
    // Then it will check if the action is perfomable (its "actionability"). Cypress fails the test if something blocks the element you want to click.
    // If it does not scroll to where you want, try setting the scrolling behaviour in `cypress.config.ts`: https://docs.cypress.io/guides/references/configuration#Actionability
    // Alternatively, just 'force click' it by passing {force: true} to `click()` (not recommended): https://docs.cypress.io/api/commands/click#Arguments
    // More about "Actionability": https://docs.cypress.io/guides/core-concepts/interacting-with-elements#Covering
    cy.findByText(note).click();

    // Check if the right amount is deducted
    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    let newBalance: string;
    cy.get("[data-testid=sidenav-user-balance]").then(($balance) => {
      newBalance = $balance.text();

      const formatBalanceStr = (str: string) => parseFloat(str.replace(/\$|,/g, ""));
      expect(formatBalanceStr(newBalance)).to.closeTo(
        formatBalanceStr(oldBalance) - parseFloat(paymentAmount),
        0.05
      );
    });
  });
});
