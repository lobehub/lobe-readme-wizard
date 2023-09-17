const backToTopShields = [
  ['<div align="right">', '[![][back-to-top]](#readme-top)', '</div>'].join('\n\n'),
  `[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-black?style=flat-square`,
];

export const addBackToTop = (content: string[]) => {
  const [md, ref] = content;
  const [shield, link] = backToTopShields;
  return [[md, shield].join('\n\n'), [ref, link].join('\n')];
};
