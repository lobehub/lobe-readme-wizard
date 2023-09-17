import { memo } from 'react';

import Title from '@/components/Title';

import Hero from './Hero';

export default memo(() => {
  return (
    <>
      <Title>Hero</Title>
      <Hero />
    </>
  );
});
