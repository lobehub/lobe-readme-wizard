import { Footer } from '@lobehub/ui';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

import { Community, Help, MoreProducts, Resources } from '@/const/data';

export default memo(() => {
  const { t } = useTranslation('footer');
  return (
    <Footer
      columns={[
        {
          items: Resources,
          title: t('resources'),
        },
        {
          items: Community,
          title: t('community'),
        },
        {
          items: Help,
          title: t('help'),
        },
        {
          items: MoreProducts,
          title: t('moreProducts'),
        },
      ]}
    />
  );
});
