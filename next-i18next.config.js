const { entryLocale, outputLocales } = require('./.i18nrc');

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: entryLocale,
    locales: [entryLocale, ...outputLocales],
  },
};
