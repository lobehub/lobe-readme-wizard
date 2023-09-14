import common from '@/../public/locales/en/common.json';
import footer from '@/../public/locales/en/footer.json';

const resources = {
  common,
  footer,
} as const;

export default resources;

export type NS = typeof resources;
