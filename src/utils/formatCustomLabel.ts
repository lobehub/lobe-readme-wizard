export const formatCustomLabel = ({
  content,
  label,
  color,
}: {
  color?: string;
  content?: string;
  label: string;
}) => {
  const data = encodeURIComponent([content, label, color || 'white'].filter(Boolean).join('-'));
  return content ? data : `-${data}`;
};
