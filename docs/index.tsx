import { ReadmeHero } from '@lobehub/readme-generator';
import { Center } from 'react-layout-kit';

export default () => {
  return (
    <Center gap={16} style={{ marginTop: '-8em', maxWidth: 960 }}>
      <ReadmeHero />
    </Center>
  );
};
