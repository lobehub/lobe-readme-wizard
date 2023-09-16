import { ActionIcon } from '@lobehub/ui';
import { kebabCase } from 'lodash-es';
import { Link } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

export interface TitleProps {
  children: string;
  link?: string;
}

const Title = memo<TitleProps>(({ children, link }) => {
  const titleContent = <h2 id={kebabCase(children)}>{children}</h2>;
  if (!link) return titleContent;
  return (
    <Flexbox align={'center'} gap={8} horizontal>
      {titleContent}
      <a href={link} rel="noreferrer" target={'_blank'}>
        <ActionIcon icon={Link} size={'site'} />
      </a>
    </Flexbox>
  );
});

export default Title;
