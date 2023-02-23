class PIM{

    checkbox_locator = "//input[@type='checkbox']";
    file_locator = "//input[@type='file']";

    checkboxAction() {
        cy.xpath(this.checkbox_locator).check({ force: true });
    }

    fileSelector(file_path) {
        cy.xpath(this.file_locator).selectFile(
            file_path,
            {
              force: true,
            }
          ); 
    }

    inputFieldBasedOnLabel(field_name, input_text) {
        cy.xpath(
            "//label[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), '"+field_name+"')]/parent::div/parent::div//input"
          ).type(input_text);
    }

    inputFieldBasedOnLabelExactMatch(field_name, input_text) {
        cy.xpath(
            "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='"+field_name+"']/parent::div/parent::div//input"
          ).type(input_text);
    }  

    clearFieldBasedOnLabel(field_name) {
        cy.xpath(
            "//label[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), '"+field_name+"')]/parent::div/parent::div//input"
          ).clear();
    }

    clearFieldBasedOnLabelExactMatch(field_name) {
        cy.xpath(
            "//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='"+field_name+"']/parent::div/parent::div//input"
          ).clear();
    }  

    inputFieldBasedOnLocator(locator, input_text) {
        cy.xpath(locator).type(input_text);
    }

}

export default PIM;