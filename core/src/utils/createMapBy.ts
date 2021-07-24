export function createMapBy<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends { [key: string]: any },
  K extends string | number = string
>(array: T[], key: string, onCall?: (current: T) => void) {
  const temp = array.reduce<Record<K, T>>((acc, current) => {
    acc[current[key] as K] = current;

    if (onCall) onCall(current);

    return acc;
  }, {} as Record<K, T>);

  return temp;
}
