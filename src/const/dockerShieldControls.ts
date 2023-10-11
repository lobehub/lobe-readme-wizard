import urlJoin from 'url-join';

import { colorOptions } from '@/const/shieldBaseControls';
import { DOCKER_URL, SHIELD_DOCKER_URL } from '@/const/url';
import { ShieldsBaseOptions } from '@/types/shields';
import { genPickList } from '@/utils/genPickList';

export interface DockerShieldControlItem extends Partial<ShieldsBaseOptions> {
  genLink?: (packageName: string) => string | undefined;
  suffix?: string;
  url: string;
}

const genLink: DockerShieldControlItem['genLink'] = (packageName) =>
  urlJoin(DOCKER_URL, packageName);

export const dockerShieldControls: {
  [key: string]: DockerShieldControlItem;
} = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  release: {
    logo: 'docker',
    logoColor: 'white',
    color: colorOptions.geekblue,
    genLink,
    url: urlJoin(SHIELD_DOCKER_URL, 'v'),
  },
  size: {
    genLink,
    color: colorOptions.geekblue,
    url: urlJoin(SHIELD_DOCKER_URL, 'image-size'),
  },
  pulls: {
    genLink,
    color: colorOptions.green,
    url: urlJoin(SHIELD_DOCKER_URL, 'pulls'),
  },
  /* eslint-enable */
};

export const dockerShieldControlsPickList = genPickList(dockerShieldControls);
