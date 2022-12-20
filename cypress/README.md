## Installation

- `yarn add cypress @testing-library/cypress`

  - Cypress now comes with official TS support

- To open cypress, run `npx cypress open` or `yarn run cypress open`. Alternative, add `"scripts"` to `package.json`: https://docs.cypress.io/guides/getting-started/opening-the-app#Adding-npm-Scripts

- Once opened, a setup window will pop up and do all the configs and files creation for you, including the folder `cypress` under root

- Cypress testing library extends the `cy` object and provides it withg extra methods provided by DOM testing library. Types can also be added to TS compiler to prevent throwing errors. Instruction on how to do it: https://testing-library.com/docs/cypress-testing-library/intro#usage

  - To let TS recognises that the types of cypress and @testing-library/cypress :

    1. You can make a `tsconfig.json` under the `cypress` folder:

    ```
    {
      "compilerOptions": {
        "types": ["cypress", "@testing-library/cypress"]
      }
    }
    ```

    2. You can include these lines in each spec files:
       /// <reference types="cypress" />
       /// <reference types="@testing-library/cypress" />

## Usage

- tests are called "specs" in cypress. They are stored under `cypress/e2e`
