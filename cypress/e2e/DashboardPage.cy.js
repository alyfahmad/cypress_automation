describe('Verify Dashboard Page', () => {
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
    it('Validate logout', () => {
        cy.xpath("//div[@class='oxd-topbar-header-userarea']//img[contains(@alt, 'profile picture')]").click();
        cy.xpath("//a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'logout')]").click();
        cy.xpath("//div[@class='orangehrm-login-branding']").should('be.visible');
    })
})