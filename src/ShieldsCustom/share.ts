import { folder } from 'leva';
import { pick } from 'lodash-es';

import { shieldBaseControls } from '@/const/shieldBaseControls';

export const defaultControls = {
  ['⚒️']: folder(pick(shieldBaseControls, ['logo', 'logoColor', 'style']), {
    collapsed: true,
  }),
};
