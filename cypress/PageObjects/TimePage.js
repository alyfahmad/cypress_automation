class Time {

    addTimeToTimesheet(column_no, duration) {
        cy.xpath("(//input[@class='oxd-input oxd-input--active'])["+column_no+"]").type(duration);
    }

}

export default Time;