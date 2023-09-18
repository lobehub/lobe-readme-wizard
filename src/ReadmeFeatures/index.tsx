import { memo } from 'react';

import { featuresSample } from '@/const/sample';
import MarkdownEditor from '@/features/MarkdownEditor';
import { addBackToTop } from '@/utils/addBackTopTop';

const Features = memo(() => {
  return <MarkdownEditor>{addBackToTop([featuresSample, '']).join('\n\n')}</MarkdownEditor>;
});

export default Features;
