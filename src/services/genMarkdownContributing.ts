import urlJoin from 'url-join';

import { prWelcomeShields } from '@/const/sample';
import { GITHUB_URL } from '@/const/url';
import { GenGithubContributorsShield } from '@/services/genGithubShield';
import { addBackToTop } from '@/utils/addBackTopTop';

interface MarkdownContributingOptions {
  backToTop?: boolean;
  owner: string;
  prWelcome: string;
  repo: string;
}

export const genMarkdownContributing = (options: MarkdownContributingOptions) => {
  const { owner, repo, prWelcome, backToTop } = options;

  const [prShield, prLink] = prWelcomeShields(prWelcome, owner, repo);
  const [contributorsShield, contributorsLink] = GenGithubContributorsShield({ owner, repo });

  const md = `
## 🤝 Contributing

Contributions of all types are more than welcome, if you are interested in contributing code, feel free to check out our GitHub [Issues][github-issues-link] to get stuck in to show us what you’re made of.

${prShield}

${contributorsShield}
  `;
  const ref = [
    `[github-issues-link]: ${urlJoin(GITHUB_URL, owner, repo, 'issues')}`,
    prLink,
    contributorsLink,
  ]
    .filter(Boolean)
    .join('\n');

  const content = [md, ref];

  return backToTop ? addBackToTop(content) : content;
};
