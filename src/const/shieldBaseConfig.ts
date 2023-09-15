import icons from './icons';

export interface ShieldBaseConfig {
  color?: string;
  label?: string;
  labelColor?: string;
  logo?: string;
  logoColor?: string;
  style?: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
}

export const colorOptions = {
  black: 'black',
  blue: '8ae8ff',
  cyan: '95f3d9',
  geekblue: '369eff',
  gold: 'ffcb47',
  green: '55b467',
  lime: 'c4f042',
  magenta: 'e34ba9',
  orange: 'ff802b',
  purple: 'bd54c6',
  red: 'f04f88',
  volcano: 'ec5e41',
  white: 'white',
  yellow: 'ffef5c',
} as const;

export const shieldBaseConfig = {
  color: {
    options: colorOptions,
    value: '',
  },
  label: '',
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
} as const;
