
# Cypress Test Automation

Hello! This was a practice automation project using Cypress 12 following Page Object Model.

- To Prepare the environment please refer to the [Environment Setup Guide](#environment-setup-guide).

## Covered Test Cases

<details>
  <summary>Login Module</summary>
  <ul>
   <li>Validate login page content</li>
   <li>Validate user cannot login without credentials</li>
   <li>Validate user cannot login with wrong credentials</li>
   <li>Fetch credentials from login page, validate login with valid credentials and logout</li>
  </ul>
</details>
<details>
  <summary>PIM Module</summary>
  <ul>
   <li>Validate login to admin account</li>
   <li>Validate navigation to PIM Page</li>
   <li>Validate new employee creation page content and requirements</li>
   <li>Validate new employee creation with basic information and credentials</li>
   <li>Validate adding pesonal details</li>
   <li>Validate adding SSN & SIN</li>
   <li>Validate adding Blood Type</li>
   <li>Validate adding Attachment</li>
   <li>Validate logout</li>
  </ul>
</details>
<details>
  <summary>Time Module</summary>
  <ul>
   <li>Validate login with employee account</li>
   <li>Validate navigation to Time Page</li>
   <li>Validate navigation to Attendence and Punch In</li>
   <li>Validate Punch In Information and Punch Out</li>
   <li>Validate navigation to My Records and available information</li>
   <li>Validate switching to My Time sheet & Edit information</li>
   <li>Validate logout</li>
  </ul>
</details>
<details>
  <summary>Data Cleanup</summary>
  <ul>
   <li>Vadlidate login to admin account</li>
   <li>Validate navigation to PIM Page</li>
   <li>Validate Search for Employee & delete</li>
   <li>Validate logout</li>
  </ul>
</details> 


## Demo Video
[demo](https://user-images.githubusercontent.com/61960249/221215969-5021b841-1897-4422-a9b7-410e26a493bb.mp4)

## Acknowledgements

 - I used a great HRM website by OrangeHRM for this automation: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
 - Cypress Documentations: https://docs.cypress.io/guides/overview/why-cypress
   

## Environment Setup Guide

1. Download and Install nodeJS from https://nodejs.org/en/download/
2. Go to This PC → Properties → Advanced System Settings → Environment Variables → System Variables → Path
3. Click edit and check if nodeJS is available for the path variable
4. Open command prompt and run the following commmands and they should return a version number
   1. node --version
   2. npm --version
5. Download and Install Visual Studio Code
6. If package.json is not available run the following command
   npm -i init
7. Then install cypress by running the following command
   npm install cypress --save -dev
8. To open cypress use the following command
   npx cypress open
9. To run your test cases through command prompt use the following commands
   npx cypress run # this will run the program in headless mode
   npx cypress run --headed # this will run the program in headed mode
   npx cypress run --spec cypress/e2e/mytest.cy.js --headed # this will run the defined specification file
   npx cypress run --spec cypress/e2e/mytest.cy.js --headed --browser chrome # this will run the defined specification file in the defined browser
10. add "/// <reference types="Cypress" />" to the command.js file in support which allows us to leverage VS Code Intellisense for the autocompletion
11. To use Xpaths as locators in cypress we need to install a plugin (cypress-xpath) from https://github.com/cypress-io/cypress/tree/develop/npm/xpath
    after installation add
    "require('@cypress/xpath');
    /// <reference types="cypress-xpath" />" to the command.js file in support


