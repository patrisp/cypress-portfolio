const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://justjoin.it',
    viewportHeight: 800,
    viewportWidth: 1280
  },
});
