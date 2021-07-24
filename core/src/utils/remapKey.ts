import set from 'lodash/set';

export function remapKey<T extends Record<string, any>>(
  address: Record<string, any>,
): T {
  return Object.keys(address).reduce<T>((acc, key) => {
    set(acc, key, address[key]);

    return acc;
  }, {} as T);
}
