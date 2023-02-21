class Common{
    clickButton(button_text) {
        cy.xpath("//button[contains(normalize-space(.),'"+button_text+"')]").click();
    }

    checkIfVisible(locator) {
        cy.xpath(locator).should("be.visible");  
    }

    inputTextBasedOnPlaceholder(placeholder, input_text) {
        cy.xpath("//input[@placeholder='"+placeholder+"']").type(input_text); 
    }

    waitUntilPageLoad(duration) {
        let duration_in_ms = duration*1000;
        cy.wait(duration_in_ms);
    }

    clickOnElement(locator) {
        cy.xpath(locator).click();
        this.waitUntilPageLoad(2);
    }
}

export default Common;