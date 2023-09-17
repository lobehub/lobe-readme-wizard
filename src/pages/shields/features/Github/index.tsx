import { memo } from 'react';

import Title from '@/components/Title';

import Action from './Action';
import Codespace from './Codespace';
import Contributors from './Contributors';
import Release from './Release';
import Social from './Social';
import StarHistory from './StarHistory';

export default memo(() => {
  return (
    <>
      <Title>Github Social Shield</Title>
      <Social />
      <Title>Github Release Shield</Title>
      <Release />
      <Title>Github Action Shield</Title>
      <Action />
      <Title link={'https://star-history.com'}>Github Star History</Title>
      <StarHistory />
      <Title>Github Codespace</Title>
      <Codespace />
      <Title link={'https://contrib.rocks'}>Github Contrib</Title>
      <Contributors />
    </>
  );
});
