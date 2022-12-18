describe("verify create new employee and login info", () => {
  it("verify login and add new employee", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.xpath("//p[contains(normalize-space(.), 'Username')]").then(($txt) => {
      let username = $txt.text();
      let username_array = username.split(":");
      username = username_array[1];
      username = username.trim();
      cy.xpath("//input[@placeholder='Username']").type(username);
      cy.xpath("//input[@placeholder='Username']").should(
        "have.value",
        username
      );
    });
    // Read Password from the login page and insert it in the input field
    cy.xpath("//p[contains(normalize-space(.), 'Password')]").then(($txt) => {
      let password = $txt.text();
      let password_array = password.split(":");
      password = password_array[1];
      password = password.trim();
      cy.xpath("//input[@placeholder='Password']").type(password);
      cy.xpath("//input[@placeholder='Password']").should(
        "have.value",
        password
      );
    });
    // Click on Login and validate
    cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
    cy.title().should("eq", "OrangeHRM");
    cy.xpath(
      "//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'dashboard')]"
    ).should("be.visible");
    cy.xpath(
      "//a/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'pim')]"
    ).click();
    cy.xpath(
      "//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'pim')]"
    ).should("be.visible");
    cy.xpath(
      "//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'add')]"
    ).click();
    cy.xpath(
      "//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'add employee')]"
    ).should("be.visible");
    // Check validations
    cy.xpath(
      "//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'save')]"
    ).click();
    cy.xpath(
      "//input[@placeholder='First Name']/parent::div/parent::div/span[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='required']"
    ).should("be.visible");
    cy.xpath(
      "//input[@placeholder='Last Name']/parent::div/parent::div/span[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='required']"
    ).should("be.visible");
    cy.xpath("//input[@type='checkbox']").check({ force: true });
    cy.xpath(
      "//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'save')]"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'username')]/parent::div/parent::div/span[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='required']"
    ).should("be.visible");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//span[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='required']"
    ).should("be.visible");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//span[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='required']"
    ).should("be.visible");

    // Add employee information
    cy.xpath("//input[@placeholder='First Name']").type("tester f_name");
    cy.xpath("//input[@placeholder='Middle Name']").type("tester m_name");
    cy.xpath("//input[@placeholder='Last Name']").type("tester l_name");
    cy.xpath("//input[@type='file']").selectFile("./cypress/robot.jpg", {
      force: true,
    });
    cy.xpath(
      "//label[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'username')]/parent::div/parent::div//input"
    ).type("tester");
    // password validation check
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//input"
    ).type("Sample");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type("Sample");
    cy.xpath(
      "//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'save')]"
    ).click();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'should have at least 8 characters')]"
    );
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//input"
    ).clear();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).clear();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//input"
    ).type("Sample_password");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type("Sample_password");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'your password must contain a lower-case letter, an upper-case letter, a digit and a special character.')]"
    );
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//input"
    ).clear();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).clear();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//input"
    ).type("S@mple_password963");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type("S@mple_password123");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'passwords do not match')]"
    );
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).clear();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type("S@mple_password963");
    cy.xpath(
      "//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'save')]"
    ).click();
  });
  // Validate previously inserted information
  cy.xpath("//input[@placeholder='First Name']").should("eq", "tester f_name");
  cy.xpath("//input[@placeholder='Middle Name']").type("eq", "tester m_name");
  cy.xpath("//input[@placeholder='Last Name']").type("eq", "tester l_name");
  //Add additional information
  cy.xpath(
    "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='nickname']/parent::div/parent::div//input"
  ).type("tester n_name");
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'license number')]/parent::div/parent::div//input"
  ).type("987-654-321");
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'license expiry date')]/parent::div/parent::div//input"
  ).type("2025-12-01");
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'ssn number')]/parent::div/parent::div//input"
  ).type("987-654-321");
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'sin number')]/parent::div/parent::div//input"
  ).type("987-654-321");
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'nationality')]/parent::div/parent::div//input"
  ).select("Bangladeshi");
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'marital status')]/parent::div/parent::div//input"
  ).select("Single");
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'date of birth')]/parent::div/parent::div//input"
  ).type("2025-12-01");
  cy.xpath(
    "//label[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='male']/input"
  ).check();
  cy.xpath(
    "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'military service')]/parent::div/parent::div//input"
  ).type("N/A");
  cy.xpath(
    "//label[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='smoker']/parent::div/parent::div//input"
  ).check();
});
