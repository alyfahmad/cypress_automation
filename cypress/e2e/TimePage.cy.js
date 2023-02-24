import Login from "../PageObjects/LoginPage";
import Common from "../PageObjects/Common";
import Time from "../PageObjects/TimePage";
import PIM from "../PageObjects/PIMPage";

describe("Verify Time Page Functionality", () => {

  let userdata;
  let locatordata;
  let logindata;
  let pimdata;
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
    cy.fixture("PIMPageLocators").then((data) => {
      pimdata = data;
      
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
    common.waitUntilPageLoad(3);
  });

  it("Validate navigation to Time Page", () => {
    common.checkIfVisible(pimdata.dashboard_header);
    common.clickOnElement(locatordata.time_option_in_sidebar);
    common.checkIfVisible(locatordata.time_header)
    common.waitUntilPageLoad(2);
  });

  it("Switch to Attendence and Punch In", () => {
    common.clickOnElement(locatordata.attendance_option);
    common.clickOnElement(locatordata.punch_in_option);
    common.clearTextBasedOnPlaceholder(userdata.time_indicator);
    common.inputTextBasedOnPlaceholder(userdata.time_indicator, userdata.punch_in_time);
    pim.inputFieldBasedOnLocator(locatordata.description_section, userdata.punch_in_description);
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
    pim.inputFieldBasedOnLocator(locatordata.description_section, userdata.punch_out_description);
    common.waitUntilPageLoad(3);
    common.clickButton(userdata.out_button);
    common.waitUntilPageLoad(5);
  });

  it("Switch to My Records & Validate information", () => {
    common.clickOnElement(locatordata.attendence_option_2);
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
    common.clickOnElement(locatordata.project_option);
    common.clickOnElement(locatordata.select_activity);
    common.clickOnElement(locatordata.activity_option);
    time.addTimeToTimesheet(2,userdata.timesheet_common_duration);
    time.addTimeToTimesheet(3,userdata.timesheet_common_duration);
    time.addTimeToTimesheet(4,userdata.timesheet_common_duration);
    time.addTimeToTimesheet(5,userdata.timesheet_common_duration);
    time.addTimeToTimesheet(6,userdata.timesheet_common_duration);
    time.addTimeToTimesheet(7,userdata.timesheet_common_duration);
    common.waitUntilPageLoad(2);
    common.clickButton(userdata.save_button);
    common.waitUntilPageLoad(5);
  });

  it("Validate logout", () => {
    common.clickOnElement(logindata.profile_picture);
    common.clickOnElement(logindata.logout_option);
  });

});
