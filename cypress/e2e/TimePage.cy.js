describe('Verify Time Page Functionality', () => {
    it('verify login with employee account', () => {
        cy.visit(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
          );
        cy.xpath("//input[@placeholder='Username']").type("tester");
        cy.xpath("//input[@placeholder='Username']").should(
            "have.value",
            "tester"
        );
        cy.xpath("//input[@placeholder='Password']").type("S@mple_password963");
        cy.xpath("//input[@placeholder='Password']").should(
            "have.value",
            "S@mple_password963"
        );
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
    })
    it('Validate navigation to Time Page', () => {
        cy.xpath(
            "//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'dashboard')]"
        ).should("be.visible");
        cy.xpath(
            "//a/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'time')]"
        ).click();
        cy.xpath(
            "//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'time')]"
        ).should("be.visible");
    })
    it('Switch to Attendence and Punch In', () => {
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'attendance')]"
        ).click();
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'attendance')]/../ul//a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'punch in')]"
        ).click();
        cy.xpath("//input[@placeholder='hh:mm']").clear();
        cy.xpath("//input[@placeholder='hh:mm']").type("08:00 AM");
        cy.xpath("//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'note')]/../..//textarea").type("Test Punch In");
        cy.wait(3000);
        cy.xpath(
            "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='in']"
        ).click();
        cy.wait(5000);
    })
    it('Validate Punch In Information and Punch Out', () => {
        cy.xpath("//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'punched in time')]/../..//p").should("be.visible");
        cy.xpath("//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'punched in note')]/../..//p").should("be.visible");
        cy.xpath("//input[@placeholder='hh:mm']").clear();
        cy.xpath("//input[@placeholder='hh:mm']").type("05:00 PM");
        cy.xpath("//label[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'note')]/../..//textarea").type("Test Punch Out");
        cy.wait(3000);
        cy.xpath(
            "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='out']"
        ).click();
        cy.wait(5000);
    })
    it('Switch to My Records & Validate information', () => {
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'attendance')]/i"
        ).click();
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'attendance')]/../ul//a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'my records')]"
        ).click();
        cy.xpath(
            "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='view']"
        ).click();
        cy.wait(5000);
        cy.xpath("//p[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), '08:00')]").should("be.visible");
        cy.xpath("//div[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'test punch in')]").should('be.visible');
        cy.xpath("//p[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), '17:00')]").should("be.visible");
        cy.xpath("//div[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'test punch out')]").should('be.visible');
        cy.xpath("//div[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), '9.00')]").should('be.visible');
    })
    it('Switch to My Time sheet & Edit', () => {
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'timesheets')]"
        ).click();
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'timesheets')]/../ul//a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'my timesheets')]"
        ).click();
        cy.xpath(
            "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='edit']"
        ).click();
        cy.wait(5000);
        cy.xpath("//input[@placeholder='Type for hints...']").clear();
        cy.xpath("//input[@placeholder='Type for hints...']").type("Internal");
        cy.wait(5000);
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'internal - recruitment')]"
        ).click();
        cy.xpath(
            "//div[contains(normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')),'select')]/..//i"
        ).click();
        cy.xpath(
            "//span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'job analysis')]"
        ).click();
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[2]").type("08:00");
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[3]").type("08:00");
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[4]").type("08:00");
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[5]").type("08:00");
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[6]").type("08:00");
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])[7]").type("08:00");
        // cy.xpath("(//input[@class='oxd-input oxd-input--active'])[8]").type("08:00");
        cy.wait(2000);
        cy.xpath(
            "//button[normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='save']"
        ).click();
        cy.wait(5000);
    })
    it('Validate logout', () => {
        cy.xpath("//div[@class='oxd-topbar-header-userarea']//img[contains(@alt, 'profile picture')]").click();
        cy.xpath("//a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'logout')]").click();
        cy.xpath("//div[@class='orangehrm-login-branding']").should('be.visible');
        
    })
})