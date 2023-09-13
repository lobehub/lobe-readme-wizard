const { description } = require('./package.json');
const { defineConfig } = require('@lobehub/i18n-cli');

module.exports = defineConfig({
  reference: description,
  entry: 'public/locales/en',
  entryLocale: 'en',
  output: 'public/locales',
  outputLocales: ['cn'],
  splitToken: 2500,
  temperature: 0,
  modelName: 'gpt-3.5-turbo',
});
