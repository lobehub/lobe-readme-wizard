import { bunShields } from '@/const/sample';
import { addBackToTop } from '@/utils/addBackTopTop';

interface MarkdownInstallationOptions {
  backToTop?: boolean;
  bun: boolean;
  esm: boolean;
  nextjs: boolean;
  packageName: string;
}

export const genMarkdownInstallation = (options: MarkdownInstallationOptions) => {
  const { esm, nextjs, packageName, bun, backToTop } = options;

  const [bunShield, bunLink] = bunShields;

  const esmBlock = `
> **Important**\\
> This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
  `;

  const installBlock = `
To install \`${packageName}\`, run the following command:

${bun ? bunShield : ''}

\`\`\`bash
$ ${bun ? 'bun add' : 'pnpm install'} ${packageName}
\`\`\`
  `;

  const nextjsBlock = `
### Compile with Next.js

> **Note**\\
> By work correct with Next.js SSR, add \`transpilePackages: ['${packageName}']\` to \`next.config.js\`. For example:

\`\`\`js
const nextConfig = {
  transpilePackages: ['${packageName}'],
};
\`\`\`
  `;

  const md = ['## 📦 Installation', esm && esmBlock, installBlock, nextjs && nextjsBlock]
    .filter(Boolean)
    .join('\n\n');
  const ref = [bun && bunLink].filter(Boolean).join('\n');

  const content = [md, ref];

  return backToTop ? addBackToTop(content) : content;
};
