import Login from "../PageObjects/LoginPage";
import Common from "../PageObjects/Common";
import PIM from "../PageObjects/PIMPage";

describe("Cleanup Data", () => {

  let logindata;
  let pimlocators;
  let pimdata;
  let employeedata;
  let login;
  let common;
  let pim;

  before(() => {

    cy.fixture("LoginPage").then((data) => {
      logindata = data;
      
    });
    cy.fixture("PIMPageLocators").then((data) => {
      pimlocators = data;
    });
    cy.fixture("PIMPage").then((data) => {
        pimdata = data;
      });

    cy.fixture("EmployeeInfo").then((data) => {
        employeedata = data;
      });

    login = new Login();
    common = new Common();
    pim = new PIM();
  });

  it("Vadlidate login to admin account", () => {
    login.navigateToURLandVeifyTitle(logindata.site, logindata.title);
    login.setUserName(logindata.admin_username);
    login.validateUserName(logindata.admin_username);
    login.setPassword(logindata.admin_password);
    login.validatePassword(logindata.admin_password);
    common.clickButton(logindata.login_button);
  });

  it("Validate navigation to PIM Page", () => {
    common.checkIfVisible(pimlocators.dashboard_header);
    common.clickOnElement(pimlocators.pim_option_in_sidebar);
    common.checkIfVisible(pimlocators.pim_header)
    common.waitUntilPageLoad(2);
  });

  it("Validate Search for Employee & delete", () => {
    pim.inputFieldBasedOnLabel(pimdata.employee_id_field_name, employeedata.employee_id);
    common.clickButtonForcefully(pimdata.search_button);
    common.waitUntilPageLoad(3);
    common.clickOnElement(pimlocators.delete_button);
    common.clickOnElement(pimlocators.delete_confirmation_button);
    common.waitUntilPageLoad(3);
  });

  it("Validate logout", () => {
    common.clickOnElement(logindata.profile_picture);
    common.clickOnElement(logindata.logout_option);
  });

})