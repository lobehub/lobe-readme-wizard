import { memo } from 'react';

import { creditsSample } from '@/const/sample';
import MarkdownEditor from '@/features/MarkdownEditor';
import { addBackToTop } from '@/utils/addBackTopTop';

const Credits = memo(() => {
  return <MarkdownEditor>{addBackToTop([creditsSample, '']).join('\n\n')}</MarkdownEditor>;
});

export default Credits;
