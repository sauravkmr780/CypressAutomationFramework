const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './cypress/reports/cucumber-json/',
    reportPath: './cypress/reports/cucumber-html/',
    metadata: {
        browser: {
            name: 'chrome',
            version: '120'
        },
        device: 'Local Machine',
        platform: {
            name: 'Windows',
            version: '11'
        }
    },
    customData: {
        title: 'Cypress BDD Test Execution Report',
        data: [
            { label: 'Project', value: 'Cypress Automation Framework' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Date', value: new Date().toLocaleString() }
        ]
    }
});

console.log('Cucumber HTML report generated successfully!');

