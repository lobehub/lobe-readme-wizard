import { githubSocialControlsPickList } from '@/const/githubShieldControls';
import {
  genGithubActionsShield,
  genGithubReleaseShields,
  genGithubSocialShields,
} from '@/services/genGithubShield';
import { genNpmShields } from '@/services/genNpmShield';

interface MarkdownHeroOptions {
  backToTop?: boolean;
  banner: string;
  branch: string;
  description: string;
  logo: string;
  logo2?: string;
  owner: string;
  packageName: string;
  repo: string;
  title: string;
  workflow: string;
}
export const genMarkdownHero = (options: MarkdownHeroOptions) => {
  const {
    logo,
    logo2,
    title,
    description,
    banner,
    workflow,
    packageName,
    backToTop,
    owner,
    repo,
    branch,
    ...config
  } = options;

  const [releaseShields, releaseLinks] = genGithubReleaseShields(
    { owner, repo, ...config },
    {
      release: !packageName,
      releaseDate: true,
    },
  );

  const [npmShield, npmLinks] = packageName
    ? genNpmShields(
        { packageName, ...config },
        {
          release: true,
        },
      )
    : ['', ''];

  const [workflowShields, workflowLinks] = workflow
    ? genGithubActionsShield({ owner, repo, workflow, ...config })
    : ['', ''];

  const [socialShields, socialLinks] = genGithubSocialShields(
    { branch, owner, repo, ...config },
    githubSocialControlsPickList,
  );

  const logoGroup = logo2
    ? [
        `<img height="120" src="${logo}">`,
        '<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">',
        `<img height="120" src="${logo2}">`,
      ].join('\n')
    : `<img height="160" src="${logo}">`;
  const firstShieldRow = [npmShield, releaseShields, workflowShields].filter(Boolean).join('\n');
  const secondShieldRow = [socialShields].filter(Boolean).join('\n');
  const shieldRows = [`${firstShieldRow}<br/>`, secondShieldRow].filter(Boolean).join('\n');

  const md = [
    `<div align="center">${backToTop ? '<a name="readme-top"></a>' : ''}`,
    logoGroup,
    `<h1>${title}</h1>`,
    description,
    shieldRows,
    '[Changelog](./CHANGELOG.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]',
    `![](${banner})`,
    '</div>',
  ].join('\n\n');

  const ref = [npmLinks, releaseLinks, workflowLinks, socialLinks].join('\n');

  const content = [md, ref];

  return content;
};
