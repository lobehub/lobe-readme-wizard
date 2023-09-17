import { memo } from 'react';

import Title from '@/components/Title';

import Deploy from './Deploy';
import Website from './Website';

export default memo(() => {
  return (
    <>
      <Title>Vercel Deploy</Title>
      <Deploy />
      <Title>Vercel Website</Title>
      <Website />
    </>
  );
});
