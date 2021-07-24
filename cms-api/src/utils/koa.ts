// TODO : Duplicated in packages/api (Need to extract to common package)
export const getArrayQueryParam = (query: any, key: string) => {
  const val = query[key];
  if (!val) return [];

  if (Array.isArray(val)) {
    return val;
  }

  return [val];
};
