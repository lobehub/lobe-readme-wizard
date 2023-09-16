export const genPickList = (obj: { [key: string]: any }): { [key: string]: boolean } => {
  const list: { [key: string]: boolean } = {};

  for (const key of Object.keys(obj)) {
    list[key] = true;
  }

  return list;
};
