## Installation

- `yarn add cypress @testing-library/cypress`
  - no need the `-D` flag for devDependncies because of how create-react-app works
- To add autocompletion: `yarn add -D @types/testing-library__cypress`

- To open cypress, run `npx cypress open` or `yarn run cypress open`. Alternative, add `"scripts"` to `package.json`: https://docs.cypress.io/guides/getting-started/opening-the-app#Adding-npm-Scripts

- Once opened, a setup window will pop up and do all the configs and files creation for you, including the folder `cypress` under root

- Cypress testing library extends the `cy` object and provides it withg extra methods provided by DOM testing library. Types can also be added to TS compiler to prevent throwing errors. Instruction on how to do it: https://testing-library.com/docs/cypress-testing-library/intro#usage

## Usage

- tests are called "specs" in cypress. They are stored under `cypress/e2e`
