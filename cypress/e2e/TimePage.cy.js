import Login from "../PageObjects/LoginPage";
import Common from "../PageObjects/Common";
import Time from "../PageObjects/TimePage";
import PIM from "../PageObjects/PIMPage";

describe("Verify Time Page Functionality", () => {

  let userdata;
  let locatordata;
  let logindata;
  let login;
  let common;
  let time;
  let pim;

  before(() => {
    cy.fixture("TimePage").then((data) => {
      userdata = data;
      
    });
    cy.fixture("TimePageLocators").then((data) => {
      locatordata = data;
      
    });
    cy.fixture("LoginPage").then((data) => {
      logindata = data;
      
    });

    login = new Login();
    common = new Common();
    time = new Time();
    pim = new PIM();
  });

  it("verify login with employee account", () => {
    login.navigateToURLandVeifyTitle(logindata.site, logindata.title);
    login.setUserName(logindata.employee_username);
    login.validateUserName(logindata.employee_username);
    login.setPassword(logindata.employee_password);
    login.validatePassword(logindata.employee_password);
    common.clickButton(logindata.login_button);
  });

  it("Validate navigation to Time Page", () => {
    common.checkIfVisible(locatordata.dashboard_header);
    common.clickOnElement(locatordata.time_option_in_sidebar);
    common.checkIfVisible(locatordata.time_header)
    common.waitUntilPageLoad(2);
  });

  it("Switch to Attendence and Punch In", () => {
    common.clickOnElement(locatordata.attendance_option);
    common.clickOnElement(locatordata.punch_in_option);
    common.clearTextBasedOnPlaceholder(userdata.time_indicator);
    common.inputTextBasedOnPlaceholder(userdata.time_indicator, userdata.punch_in_time);
    pim.inputFieldBasedOnLocator(userdata.description_section, userdata.punch_in_description);
    common.waitUntilPageLoad(3);
    common.clickButton(userdata.in_button);
    // cy.xpath(
    //   "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='in']"
    // ).click();
    common.waitUntilPageLoad(5);
  });

  it("Validate Punch In Information and Punch Out", () => {
    common.checkIfVisible(locatordata.punched_in_time_validation);
    common.checkIfVisible(locatordata.punched_in_desc_validation);
    common.clearTextBasedOnPlaceholder(userdata.time_indicator);
    common.inputTextBasedOnPlaceholder(userdata.time_indicator, userdata.punch_out_time);
    pim.inputFieldBasedOnLocator(userdata.description_section, userdata.punch_out_description);
    common.waitUntilPageLoad(3);
    common.clickButton(userdata.out_button);
    common.waitUntilPageLoad(5);
  });

  it("Switch to My Records & Validate information", () => {
    common.clickOnElement(locatordata.attendance_option);
    common.clickOnElement(locatordata.my_records_option);
    common.clickButton(userdata.view_button);
    common.waitUntilPageLoad(5);
    common.checkIfVisible(locatordata.my_records_punch_in_time_validator);
    common.checkIfVisible(locatordata.my_records_punch_in_desc_validator);
    common.checkIfVisible(locatordata.my_records_punch_out_time_validator);
    common.checkIfVisible(locatordata.my_records_punch_out_desc_validator);
    common.checkIfVisible(locatordata.my_records_duration_validator);
  });

  it("Switch to My Time sheet & Edit", () => {
    common.clickOnElement(locatordata.timesheets_option);
    common.clickOnElement(locatordata.my_timesheets_option);
    common.clickButton(userdata.edit_button);
    common.waitUntilPageLoad(5);
    common.clearTextBasedOnPlaceholder(userdata.search_placeholder);
    common.inputTextBasedOnPlaceholder(userdata.search_placeholder, userdata.deparment);
    common.waitUntilPageLoad(5);





    
    
    cy.xpath(
      "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'internal - recruitment')]"
    ).click();
    cy.xpath(
      "//div[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'select')]/..//i"
    ).click();
    cy.xpath(
      "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'job analysis')]"
    ).click();
    cy.xpath("(//input[@class='oxd-input oxd-input--active'])[2]").type(
      userdata.timesheet_common_duration
    );
    cy.xpath("(//input[@class='oxd-input oxd-input--active'])[3]").type(
      userdata.timesheet_common_duration
    );
    cy.xpath("(//input[@class='oxd-input oxd-input--active'])[4]").type(
      userdata.timesheet_common_duration
    );
    cy.xpath("(//input[@class='oxd-input oxd-input--active'])[5]").type(
      userdata.timesheet_common_duration
    );
    cy.xpath("(//input[@class='oxd-input oxd-input--active'])[6]").type(
      userdata.timesheet_common_duration
    );
    cy.xpath("(//input[@class='oxd-input oxd-input--active'])[7]").type(
      userdata.timesheet_common_duration
    );
    // cy.xpath("(//input[@class='oxd-input oxd-input--active'])[8]").type("08:00");
    common.waitUntilPageLoad(2);
    cy.xpath(
      "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='save']"
    ).click();
    common.waitUntilPageLoad(5);
  });

  it("Validate logout", () => {
    common.clickOnElement(logindata.profile_picture);
    common.clickOnElement(logindata.logout_option);
  });

});
