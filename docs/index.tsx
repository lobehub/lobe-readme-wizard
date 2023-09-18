import { ReadmeHero } from '@lobehub/readme-wizard';
import { Button } from 'antd';
import { Link } from 'dumi';
import { Center } from 'react-layout-kit';

export default () => {
  return (
    <Center gap={16} style={{ marginTop: '-6em', maxWidth: 960 }}>
      <ReadmeHero />
      <Link to={'/components/readme-hero'}>
        <Button size={'large'}>Find more MAGIC 🔮</Button>
      </Link>
    </Center>
  );
};
