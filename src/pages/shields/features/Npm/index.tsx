import { memo } from 'react';

import Title from '@/components/Title';

import Release from './Release';

export default memo(() => {
  return (
    <>
      <Title>NPM Release Shield</Title>
      <Release />
    </>
  );
});
