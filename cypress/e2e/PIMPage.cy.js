describe('verify create new employee and login info', () => {
  let userdata;
  let employeedata;
  before( ()=> {
      cy.fixture('PIMPage').then( (data)=> {
        userdata = data;
      })
      cy.fixture('EmployeeInfo').then( (data)=> {
        employeedata = data;
    })
  })
  it('verify login to admin account', () => {
    cy.visit(userdata.site);
    cy.title().should('eq',userdata.title);
    cy.xpath("//input[@placeholder='Username']").type(userdata.admin_username);
    cy.xpath("//input[@placeholder='Username']").should(
      "have.value",
      userdata.admin_username
    );
    cy.xpath("//input[@placeholder='Password']").type(userdata.admin_password);
    cy.xpath("//input[@placeholder='Password']").should(
      "have.value",
      userdata.admin_password
    );
    cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
    cy.title().should('eq',userdata.title);
  })
  it("Navigate to PIM", () => {
    cy.xpath(
      "//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'dashboard')]"
    ).should("be.visible");
    cy.xpath(
      "//a/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'pim')]"
    ).click();
    cy.xpath(
      "//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'pim')]"
    ).should("be.visible");
  })
  it("Validate new employee creation page content", () => {
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
  })

    // Add employee information
    it("Validate & Add new employee basic information and credentials", () => {
    cy.xpath("//input[@placeholder='First Name']").type(employeedata.employee_first_name);
    cy.xpath("//input[@placeholder='Middle Name']").type(employeedata.employee_middle_name);
    cy.xpath("//input[@placeholder='Last Name']").type(employeedata.employee_last_name);
    cy.xpath("//input[@type='file']").selectFile(employeedata.employee_profile_pic_path, {
      force: true,
    });
    cy.xpath(
      "//label[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'username')]/parent::div/parent::div//input"
    ).type(employeedata.employee_username);
    // password validation check
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//input"
    ).type(employeedata.employee_incorrect_password_1);
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type(employeedata.employee_incorrect_password_1);
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
    ).type(employeedata.employee_incorrect_password_2);
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type(employeedata.employee_incorrect_password_2);
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
    ).type(employeedata.employee_password);
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type(employeedata.employee_incorrect_password_3);
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'passwords do not match')]"
    );
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).clear();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input"
    ).type(employeedata.employee_password);
    cy.xpath(
      "//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'save')]"
    ).click();
    // Validate previously inserted information
    cy.xpath("//input[@placeholder='First Name']").should(
      "have.value",
      employeedata.employee_first_name
    );
    cy.xpath("//input[@placeholder='Middle Name']").should(
      "have.value",
      employeedata.employee_middle_name
    );
    cy.xpath("//input[@placeholder='Last Name']").should(
      "have.value",
      employeedata.employee_last_name
    );
    })
    it("Validate & Add Pesonal Details", () => {
    //Add additional information
    cy.xpath(
      "//h6[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='personal details']",
      { timeout: 10000 }
    ).should("be.visible");
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='nickname']/parent::div/parent::div//input"
    ).type(employeedata.employee_nick_name);
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='employee id']/parent::div/parent::div//input"
    ).clear();
    cy.xpath(
      "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='employee id']/parent::div/parent::div//input"
    ).type(employeedata.employee_id);
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'license number')]/parent::div/parent::div//input"
    ).type(employeedata.employee_common_number);
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'license expiry date')]/parent::div/parent::div//input"
    ).type(employeedata.employee_common_expiry_date);
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'license expiry date')]/parent::div/parent::div//input"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'nationality')]/parent::div/parent::div//i"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'nationality')]/parent::div/parent::div//span[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'bangladeshi')]"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'marital status')]/parent::div/parent::div//i"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'marital status')]/parent::div/parent::div//span[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'single')]"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'date of birth')]/parent::div/parent::div//input"
    ).type(employeedata.employee_birth_date);
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'date of birth')]/parent::div/parent::div//input"
    ).click();
    cy.xpath(
      "//label[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='male']/span"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'military service')]/parent::div/parent::div//input"
    ).type(employeedata.employee_na_text);
    cy.xpath(
      "//label[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='smoker']/parent::div/parent::div//i"
    ).click();
    cy.xpath(
      "(//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='save'])[1]"
    ).click();
    })
    it("Add SSN & SIN", () => {
    // add ssn & sin
    cy.wait(5000);
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'ssn number')]/parent::div/parent::div//input"
    ).type(employeedata.employee_common_number);
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'sin number')]/parent::div/parent::div//input"
    ).type(employeedata.employee_common_number);
    cy.xpath(
      "(//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='save'])[1]"
    ).click();
    })
    // add blood type
    it("Add Blood Type", () => {
    cy.wait(5000);
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'blood type')]/parent::div/parent::div//i"
    ).click();
    cy.xpath(
      "//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'blood type')]/parent::div/parent::div//span[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'o-')]"
    ).click();
    cy.xpath(
      "(//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='save'])[2]"
    ).click();
    })
    // add attachment
    it("Add Attachment", () => {
    cy.wait(5000);
    cy.xpath(
      "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='add']"
    ).click();
    cy.wait(2000);
    cy.xpath("//input[@type='file']").selectFile(employeedata.employee_attachment_path, {
      force: true,
    });
    cy.xpath(
      "//label[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='comment']/../..//textarea"
    ).type(employeedata.employee_attachment_description);
    cy.xpath(
      "(//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='save'])[3]"
    ).click();
    cy.wait(5000);
  })
  it('Validate logout', () => {
    cy.xpath("//div[@class='oxd-topbar-header-userarea']//img[contains(@alt, 'profile picture')]").click();
    cy.xpath("//a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'logout')]").click();
    cy.xpath("//div[@class='orangehrm-login-branding']").should('be.visible');
  })
})
