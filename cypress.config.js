const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require ("cypress-image-diff-js/dist/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
      // implement node event listeners here
    },
    baseUrl: 'https://justjoin.it',
    viewportHeight: 800,
    viewportWidth: 1280
  },
  env: {
    MAILOSAUR_API_KEY: '1HvsFG7YPic3rhdX'
  }
});



