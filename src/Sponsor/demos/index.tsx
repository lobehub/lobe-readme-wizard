import { Sponsor } from '@lobehub/readme-wizard';
import { StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { useThemeMode } from 'antd-style';
import useSWR from 'swr';

import { fetchSponsors } from '@/services/sponsorkit';

import { DEFAULT_AVATAR_SIZE, DEFAULT_WIDTH } from '../const';
import { caleHeight } from '../utils';

export default () => {
  const { data, isLoading } = useSWR('sponsor', async () =>
    fetchSponsors({
      github: {
        login: process.env.SPONSORKIT_GITHUB_LOGIN || '',
        token: process.env.SPONSORKIT_GITHUB_TOKEN || '',
        type: process.env.SPONSORKIT_GITHUB_TYPE || 'organization',
      },
      includePastSponsors: true,
      opencollective: {
        key: process.env.SPONSORKIT_OPENCOLLECTIVE_KEY || '',
        slug: process.env.SPONSORKIT_OPENCOLLECTIVE_ID || 'lobehub',
        type: process.env.SPONSORKIT_OPENCOLLECTIVE_TYPE || 'collective',
      },
    }),
  );
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
      {isLoading ? (
        <Skeleton active title={false} />
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
