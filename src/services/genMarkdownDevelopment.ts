import { bunShields } from '@/const/sample';
import { GenGithubCodespaceShield } from '@/services/genGithubShield';
import { addBackToTop } from '@/utils/addBackTopTop';

interface MarkdownDevelopmentOptions {
  backToTop?: boolean;
  bun: boolean;
  owner: string;
  repo: string;
}
export const genMarkdownDevelopment = (options: MarkdownDevelopmentOptions) => {
  const { owner, repo, bun, backToTop } = options;

  const [bunShield, bunLink] = bunShields;

  const [codespaceShield, codespaceLink] = GenGithubCodespaceShield({ owner, repo });

  const md = `
## ⌨️ Local Development

You can use Github Codespaces for online development:

${codespaceShield}

Or clone it for local development:

${bun ? bunShield : ''}

\`\`\`bash
$ git clone https://github.com/${owner}/${repo}.git
$ cd ${repo}
$ ${bun ? 'bun' : 'pnpm'} install
$ ${bun ? 'bun' : 'pnpm'} dev
\`\`\`
  `;

  const ref = [codespaceLink, bun && bunLink].filter(Boolean).join('\n');

  const content = [md, ref];

  return backToTop ? addBackToTop(content) : content;
};
