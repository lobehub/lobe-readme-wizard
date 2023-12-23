import { Sponsor } from '@lobehub/readme-wizard';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import useSWR from 'swr';

import { DEFAULT_AVATAR_SIZE, DEFAULT_WIDTH } from '../const';
import { caleHeight, fetchOpenCollectiveData } from '../utils';

export default () => {
  const { isDarkMode } = useThemeMode();
  const store = useCreateStore();
  const { id, width, avatarSize } = useControls(
    {
      avatarSize: {
        step: 1,
        value: DEFAULT_AVATAR_SIZE,
      },
      id: 'lobehub',
      width: {
        step: 1,
        value: DEFAULT_WIDTH,
      },
    },
    { store },
  );
  const { data, isLoading } = useSWR(id, fetchOpenCollectiveData, { revalidateOnFocus: false });

  return (
    <StoryBook levaStore={store}>
      {isLoading || !data ? (
        <div>loading...</div>
      ) : (
        <div
          style={{
            height: caleHeight(data, { avatarSize, width }),
            overflow: 'hidden',
            width,
          }}
        >
          <Sponsor avatarSize={avatarSize} data={data} themeMode={isDarkMode ? 'dark' : 'light'} />
        </div>
      )}
    </StoryBook>
  );
};
