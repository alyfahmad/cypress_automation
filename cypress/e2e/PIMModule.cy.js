import Login from "../PageObjects/LoginPage";
import Common from "../PageObjects/Common";
import PIM from "../PageObjects/PIMPage";

describe("verify create new employee and login info", () => {

  let userdata;
  let employeedata;
  let locatordata;
  let logindata;
  let login;
  let common;
  let pim;

  before(() => {
    cy.fixture("PIMPage").then((data) => {
      userdata = data;
    });
    cy.fixture("EmployeeInfo").then((data) => {
      employeedata = data;
    });
    cy.fixture("PIMPageLocators").then((data) => {
      locatordata = data;
    });
    cy.fixture("LoginPage").then((data) => {
      logindata = data;
    });
    login = new Login();
    common = new Common();
    pim = new PIM();
  });


  it("Validate login to admin account", () => {
    login.navigateToURLandVeifyTitle(logindata.site, logindata.title);
    login.setUserName(logindata.admin_username);
    login.validateUserName(logindata.admin_username);
    login.setPassword(logindata.admin_password);
    login.validatePassword(logindata.admin_password);
    common.clickButton(logindata.login_button);
  });

  it("Validate navigation to PIM", () => {
    common.checkIfVisible(locatordata.dashboard_header);
    common.clickOnElement(locatordata.pim_option_in_sidebar);
    common.checkIfVisible(locatordata.pim_header)
    common.waitUntilPageLoad(2);
  });

  it("Validate new employee creation page content and requirements", () => {
    common.clickButtonForcefully(userdata.add_button);
    common.checkIfVisible(locatordata.add_employee_header);
    common.clickButton(userdata.save_button);
    common.checkIfVisible(locatordata.first_name_required);
    common.checkIfVisible(locatordata.last_name_required);
    pim.checkboxAction();
    common.clickButton(userdata.save_button);
    common.checkIfVisible(locatordata.username_required);
    common.checkIfVisible(locatordata.password_required);
    common.checkIfVisible(locatordata.confirm_password_rerquired);
  });

  // Add employee information
  it("Validate new employee creation with basic information and credentials", () => {
    common.inputTextBasedOnPlaceholder(userdata.first_name_placeholder, employeedata.employee_first_name);
    common.inputTextBasedOnPlaceholder(userdata.middle_name_placeholder, employeedata.employee_middle_name);
    common.inputTextBasedOnPlaceholder(userdata.last_name_placeholder, employeedata.employee_last_name);
    pim.fileSelector(employeedata.employee_profile_pic_path);
    pim.inputFieldBasedOnLabel(userdata.username_field_name, employeedata.employee_username);
    pim.inputFieldBasedOnLabelExactMatch(userdata.password_field_name, employeedata.employee_incorrect_password_1);
    pim.inputFieldBasedOnLabelExactMatch(userdata.confirmed_password_field_name, employeedata.employee_incorrect_password_1);
    common.clickButton(userdata.save_button);
    common.checkIfVisible(locatordata.password_minimum_character_validation);
    pim.clearFieldBasedOnLabelExactMatch(userdata.password_field_name);
    pim.clearFieldBasedOnLabelExactMatch(userdata.confirmed_password_field_name);
    pim.inputFieldBasedOnLabelExactMatch(userdata.password_field_name, employeedata.employee_incorrect_password_2);
    pim.inputFieldBasedOnLabelExactMatch(userdata.confirmed_password_field_name, employeedata.employee_incorrect_password_2);
    common.checkIfVisible(locatordata.password_combination_validation);
    pim.clearFieldBasedOnLabelExactMatch(userdata.password_field_name);
    pim.clearFieldBasedOnLabelExactMatch(userdata.confirmed_password_field_name);
    pim.inputFieldBasedOnLabelExactMatch(userdata.password_field_name, employeedata.employee_password);
    pim.inputFieldBasedOnLabelExactMatch(userdata.confirmed_password_field_name, employeedata.employee_incorrect_password_3);
    common.checkIfVisible(locatordata.password_mismatch_validation);
    pim.clearFieldBasedOnLabelExactMatch(userdata.confirmed_password_field_name);
    pim.inputFieldBasedOnLabelExactMatch(userdata.confirmed_password_field_name, employeedata.employee_password);
    common.clickButton(userdata.save_button);
    common.waitUntilPageLoad(3);
    common.validateTextBasedOnPlaceholder(userdata.first_name_placeholder,employeedata.employee_first_name);
    common.validateTextBasedOnPlaceholder(userdata.middle_name_placeholder,employeedata.employee_middle_name);
    common.validateTextBasedOnPlaceholder(userdata.last_name_placeholder,employeedata.employee_last_name);
  });

  //Add additional information
  it("Validate adding pesonal details", () => {
    common.checkIfVisible(locatordata.personal_information_header);
    pim.inputFieldBasedOnLabel(userdata.nickname_field_name, employeedata.employee_nick_name);
    pim.clearFieldBasedOnLabel(userdata.employee_id_field_name);
    pim.inputFieldBasedOnLabel(userdata.employee_id_field_name, employeedata.employee_id);
    pim.inputFieldBasedOnLabel(userdata.license_number_field_name, employeedata.employee_common_number);
    pim.inputFieldBasedOnLabel(userdata.license_expiry_date_field_name, employeedata.employee_common_expiry_date);
    common.clickOnElement(locatordata.expiry_date_element);
    common.clickOnElement(locatordata.nationality_selection_element);
    common.clickOnElement(locatordata.nationality_option_element);
    common.clickOnElement(locatordata.marital_status_selection_element);
    common.clickOnElement(locatordata.marital_status_option_element);
    pim.inputFieldBasedOnLabel(userdata.date_of_birth_field_name, employeedata.employee_birth_date);
    common.clickOnElement(locatordata.birth_date_element);
    common.clickOnElement(locatordata.gender_option_element);
    pim.inputFieldBasedOnLabel(userdata.military_sevice_field_name, employeedata.employee_na_text);
    common.clickOnElement(locatordata.smoker_option_element);
    common.clickOnElement(locatordata.save_button_1);
  });

  // add ssn & sin
  it("Validate adding SSN & SIN", () => {
    common.waitUntilPageLoad(5);
    pim.inputFieldBasedOnLabel(userdata.ssn_field_name, employeedata.employee_common_number);
    pim.inputFieldBasedOnLabel(userdata.sin_field_name, employeedata.employee_common_number);
    common.clickOnElement(locatordata.save_button_1);
  });


  // add blood type
  it("Validate adding Blood Type", () => {
    common.waitUntilPageLoad(5);
    common.clickOnElement(locatordata.blood_type_selection_element);
    common.clickOnElement(locatordata.blood_type_option_element)
    common.clickOnElement(locatordata.save_button_2);
  });


  // add attachment
  it("Validate adding Attachment", () => {
    common.waitUntilPageLoad(5);
    common.clickButton(userdata.add_button);
    common.waitUntilPageLoad(2);
    pim.fileSelector(employeedata.employee_attachment_path);
    pim.inputFieldBasedOnLocator(locatordata.attachment_description_element, employeedata.employee_attachment_description);
    common.clickOnElement(locatordata.save_button_3);
    common.waitUntilPageLoad(5);
  });


  it("Validate logout", () => {
    common.clickOnElement(logindata.profile_picture);
    common.clickOnElement(logindata.logout_option);
  });
  
});
