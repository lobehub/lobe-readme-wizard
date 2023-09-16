import { memo } from 'react';

import Title from '@/components/Title';

import Discord from './Discord';
import Double from './Double';
import Single from './Single';
import Website from './Website';

export default memo(() => {
  return (
    <>
      <Title>Custom Single Shield</Title>
      <Single />
      <Title>Custom Double Shield</Title>
      <Double />
      <Title>Website Shield</Title>
      <Website />
      <Title link={'https://vimeo.com/364220040'}>Discord Shield</Title>
      <Discord />
    </>
  );
});
