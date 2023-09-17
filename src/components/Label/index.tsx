import { LucideIcon } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const Label = memo<{ icon?: LucideIcon; title: string }>(({ title, icon }) => {
  if (!icon) return title;
  const Render = icon;
  return (
    <Flexbox align={'center'} gap={4} horizontal style={{ height: 32 }}>
      <Render size={'1em'} />
      {title}
    </Flexbox>
  );
});

export default Label;
