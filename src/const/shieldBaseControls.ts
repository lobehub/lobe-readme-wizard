import icons from './icons';

export const colorOptions = {
  black: 'black',
  blue: '8ae8ff',
  cyan: '95f3d9',
  geekblue: '369eff',
  gold: 'ffcb47',
  green: '55b467',
  lime: 'c4f042',
  magenta: 'ff80eb',
  orange: 'ff802b',
  purple: 'B0A3FF',
  red: 'f04f88',
  volcano: 'ec5e41',
  white: 'white',
  yellow: 'ffef5c',
} as const;

export const shieldBaseControls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  label: '',
  color: {
    options: colorOptions,
    value: '',
  },
  labelColor: {
    options: colorOptions,
    value: 'black',
  },
  logo: {
    options: icons,
    value: '',
  },
  logoColor: {
    options: colorOptions,
    value: '',
  },
  style: {
    options: ['flat', 'flat-square', 'plastic', 'for-the-badge', 'social'],
    value: 'flat-square',
  },
  /* eslint-enable */
} as const;
