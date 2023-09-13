import common from '../../public/locales/en/common.json';

const resources = {
  common,
} as const;

export default resources;

export type NS = typeof resources;
