import Login from "../PageObjects/LoginPage";
import Common from "../PageObjects/Common";

describe("Verify login page", { testIsolation: true }, () => {

  let userdata;
  let locatordata;
  let login;
  let common;

  before(() => {
    cy.fixture("LoginPage").then((data) => {
      userdata = data;
    });
    cy.fixture("LoginPageLocators").then((data) => {
      locatordata = data;
    });
    login = new Login();
    common = new Common();
  });

  it("Validate login page content", () => {
    // Navigate to the specified url and validate page title
    login.navigateToURLandVeifyTitle(userdata.site, userdata.title);
    common.checkIfVisible(locatordata.orangehrm_login_branding);
    common.checkIfVisible(locatordata.orangehrm_login_logo);
    common.checkIfVisible(locatordata.login_header);
    common.checkIfVisible(locatordata.orangehrm_os);
    common.checkIfVisible(locatordata.oragehrm_inc);
    common.checkIfVisible(locatordata.linkedin_ref);
    common.checkIfVisible(locatordata.facebook_ref);
    common.checkIfVisible(locatordata.twitter_ref);
    common.checkIfVisible(locatordata.youtube_ref);
  });

  it("Validate user cannot login without credentials", () => {
    // Navigate to the specified url and validate page title
    login.navigateToURLandVeifyTitle(userdata.site, userdata.title);
    common.clickButton(locatordata.login_button);
    common.checkIfVisible(locatordata.username_required);
    common.checkIfVisible(locatordata.password_required);
  });

  it("Validate user cannot login with wrong credentials", () => {
    // Navigate to the specified url and validate page title
    login.navigateToURLandVeifyTitle(userdata.site, userdata.title);
    login.setUserName(userdata.incorrect_username);
    common.clickButton(locatordata.login_button);
    common.checkIfVisible(locatordata.password_required);
    login.clearUserName();
    common.checkIfVisible(locatordata.username_required);
    login.setUserName(userdata.incorrect_username);
    login.setPassword(userdata.incorrect_password);
    common.clickButton(locatordata.login_button);
    common.checkIfVisible(locatordata.invalid_credentials);
  });

  it("Fetch credentials from login page, validate login with valid credentials and logout", () => {
    // Navigate to the specified url and validate page title
    login.navigateToURLandVeifyTitle(userdata.site, userdata.title);
    // Read Username from the login page and insert it in the input field
    login.fetchUsernameFromLoginPageSetUsername();
    login.validateUserName(userdata.admin_username);
    login.fetchPasswordFromLoginPageandSetPassword();
    login.validatePassword(userdata.admin_password);
    common.clickButton(locatordata.login_button);
    common.checkIfVisible(locatordata.dashboard_header);
    common.clickOnElement(locatordata.profile_picture);
    common.clickOnElement(locatordata.logout_option);
  });
});
