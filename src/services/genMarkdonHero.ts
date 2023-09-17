import { githubSoialControlsPickList } from '@/const/githubShieldControls';
import {
  genGithubActionsShield,
  genGithubReleaseShields,
  genGithubSocialShields,
} from '@/services/genGithubShield';
import { genNpmReleaseShields } from '@/services/genNpmShield';

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
  const { logo, logo2, title, description, banner, workflow, packageName, backToTop } = options;

  const [releaseShields, releaseLinks] = genGithubReleaseShields(options, {
    release: !packageName,
    releaseDate: true,
  });

  const [npmShield, npmLinks] = packageName
    ? genNpmReleaseShields(options, {
        release: true,
      })
    : ['', ''];

  const [workflowShields, workflowLinks] = workflow ? genGithubActionsShield(options) : ['', ''];

  const [socialShields, socialLinks] = genGithubSocialShields(options, githubSoialControlsPickList);

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
    `# ${title}`,
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
