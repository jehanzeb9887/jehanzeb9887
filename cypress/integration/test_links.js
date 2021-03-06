import config from './config.json'

describe('Test Broken Links', () => {

    it('verify navigation across the pages', () => {

        cy.visit(`${config.URL}`)
        cy.on('window:confirm', cy.stub().as('confirm'))
        Cypress.on('uncaught:exception', (err, runnable) => {
           
            // In case of test fails
            return false
        })

        cy.wrap('passed').as('ctrl')
        cy.get("a:not([href*='mailto:]']").each($el => {

            if ($el.prop('href').length > 0) {
                const message = $el.text()
                expect($el, message).to.have.attr("href").not.contain("undefined")
                cy.log($el.attr('href'))
            }
        })
    })
})