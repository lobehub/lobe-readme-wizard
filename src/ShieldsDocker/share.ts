import { folder } from 'leva';
import { cloneDeep, pick } from 'lodash-es';

import { shieldBaseControls } from '@/const/shieldBaseControls';

export const defaultControls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  packageName: 'lobehub/lobe-chat',
  /* eslint-enable */
};

export const defaultControlsExtra = {
  ...defaultControls,
  ['⚒️']: folder(pick(cloneDeep(shieldBaseControls), ['color', 'labelColor', 'style']), {
    collapsed: true,
  }),
};
