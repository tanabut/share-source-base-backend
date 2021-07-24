import get from 'lodash/get';

export function uniqueMap<T>(arr: T[], keys: string[]) {
  const uMap: { [key: string]: number } = {};
  return arr.reduce((acc: T[], curr: any) => {
    const key = keys.reduce((s, k) => `${s}__${get(curr, k)}`, '');

    if (uMap[key] !== undefined) {
      acc[uMap[key] as number] = curr;
      return acc;
    }

    acc.push(curr);
    uMap[key] = acc.length - 1;

    return acc;
  }, []);
}
