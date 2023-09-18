import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo, useState } from 'react';

import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownStorybook from '@/components/MarkdownStorybook';
import { creditsSample } from '@/const/sample';
import { genMarkdownCredits } from '@/services/genMarkdownCredits';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  title: 'Links',
  backToTop: true,
  /* eslint-enable */
};

const Credits = memo(() => {
  const [value, setValue] = useState(creditsSample);
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genMarkdownCredits(options, value), [value, options]);

  return (
    <>
      <MarkdownEditor onChange={setValue} value={value} />
      <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>
    </>
  );
});

export default Credits;
