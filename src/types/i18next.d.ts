import 'i18next';

import { NS } from '@/types/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: NS;
  }
}
