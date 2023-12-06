import { Sponsor } from '@lobehub/readme-wizard';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import useSWR from 'swr';

export default () => {
  const { isDarkMode } = useThemeMode();
  const store = useCreateStore();
  const { id, ...config } = useControls(
    {
      avatarSize: 64,
      id: 'lobehub',
      padding: 0,
      width: 800,
    },
    { store },
  );
  const { data, isLoading } = useSWR(
    id,
    async () => {
      const res = await fetch(`https://opencollective.com/${id}/members/all.json`);
      const json = await res.json();
      return json;
    },
    { revalidateOnFocus: false },
  );

  return (
    <StoryBook levaStore={store}>
      {isLoading || !data ? (
        <div>loading...</div>
      ) : (
        <Sponsor data={data} themeMode={isDarkMode ? 'dark' : 'light'} {...config} />
      )}
    </StoryBook>
  );
};
