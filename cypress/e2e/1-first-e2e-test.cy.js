/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe("first e2e test", () => {
  // https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test#What-you-ll-learn

  /**
   * Visiting a page
   */
  // Cypress forces you to use Mocha (test setup) & Chai (assertion), so must be `it` and not `test`
  it("should visit", () => {
    // This goes to your the baseUrl you specified in cypress.config.ts --> "e2e"
    // https://docs.cypress.io/guides/references/configuration#baseUrl-is-not-set
    // cy.visit will FAIL the test if the returned HTTP status code is not 2xx
    cy.visit("/");
  });

  /**
   * Queries & default assertion
   */

  it("finds 'type' element in kitchen sink website", () => {
    // You can also pass a full URL to cy.visit
    cy.visit("https://example.cypress.io/");
    // Use cy.contains to get the DOM element that CONTAINS the specified string/number/regexp
    // Again, if it cannot find the element, it fails the test. This type of query has what we call "Default assertion"
    cy.contains("type");
    // If query is not successful on first attempt, it will wait and retry a few times until a timeout, then it will fail
    // So the below will only fail after 4000ms:
    // cy.contains("hype");

    // Alternatively, you can use the `cy.get(<querySelector>)` method, just like the selector in `HTMLElement.querySelector()`
  });

  /**
   * User action
   */
  it("clicks the link 'type'", () => {
    cy.visit("https://example.cypress.io/");
    // You can fire actions from a queried element
    // This means to click the element that contains 'type':
    cy.contains("type").click();

    // For text input elements, use the .type() method
    // For checkboxes/radios, use .check()
  });

  /**
   * Assertions
   */
  it(`clicking "type" navigates to a new url`, () => {
    cy.visit("https://example.cypress.io/");
    cy.contains("type").click();
    // get url from cy using cy.url(); this returns a chainable STRING object
    // then assert on it using `should`; this method is available for assertable subjects
    // First provide the type of assertion (the 'chainer' in Chai), then (optionally) the assertion value
    cy.url().should("include", "/commands/actions");
  });

  /**
   * Assertion using `expect`
   */
  it("should agree true === true", () => {
    // Chai also has an `expect` function, just slight difference in syntax to Jest
    expect(true).to.equal(true);
  });
});
