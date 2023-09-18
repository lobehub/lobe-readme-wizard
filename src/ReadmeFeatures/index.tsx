import { useControls, useCreateStore } from '@lobehub/ui';
import { memo, useMemo, useState } from 'react';

import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownStorybook from '@/components/MarkdownStorybook';
import { featuresSample } from '@/const/sample';
import { genMarkdownFeatures } from '@/services/genMarkdownFeatures';

const controls = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  title: 'Features',
  backToTop: true,
  /* eslint-enable */
};

const Features = memo(() => {
  const [value, setValue] = useState(featuresSample);
  const store = useCreateStore();

  const options = useControls(controls, { store });

  const md = useMemo(() => genMarkdownFeatures(options, value), [value, options]);

  return (
    <>
      <MarkdownEditor onChange={setValue} value={value} />
      <MarkdownStorybook levaStore={store}>{md.join('\n\n')}</MarkdownStorybook>
    </>
  );
});

export default Features;
