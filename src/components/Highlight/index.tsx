import { Highlighter, HighlighterProps } from '@lobehub/ui';
import { memo } from 'react';
import useSWR from 'swr';

import { remarkFormat } from '@/utils/remarkFormat';

const Highlight = memo<HighlighterProps>(({ children, ...props }) => {
  const { data, isLoading } = useSWR(children, () => remarkFormat(children));

  return (
    <Highlighter {...props} language={'md'} type={'pure'}>
      {isLoading ? '' : String(data)}
    </Highlighter>
  );
});

export default Highlight;
