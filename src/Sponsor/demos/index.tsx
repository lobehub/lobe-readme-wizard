import { Sponsor } from '@lobehub/readme-wizard';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';

import { DEFAULT_AVATAR_SIZE, DEFAULT_WIDTH } from '../const';
import { caleHeight } from '../utils';
import data from './data';

export default () => {
  const { isDarkMode } = useThemeMode();
  const store = useCreateStore();
  const { width, avatarSize } = useControls(
    {
      avatarSize: {
        step: 1,
        value: DEFAULT_AVATAR_SIZE,
      },

      width: {
        step: 1,
        value: DEFAULT_WIDTH,
      },
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <div
        style={{
          height: caleHeight(data, { avatarSize, width }),
          overflow: 'hidden',
          width,
        }}
      >
        <Sponsor avatarSize={avatarSize} data={data} themeMode={isDarkMode ? 'dark' : 'light'} />
      </div>
    </StoryBook>
  );
};
