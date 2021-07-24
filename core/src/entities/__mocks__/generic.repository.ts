export default jest.fn().mockImplementation(() => {
  return {
    getEntityMapByIds: jest.fn(async (_, ids, key) => {
      return ids.reduce(
        (acc: any, curr: string) =>
          curr
            ? {
                ...acc,
                [curr]: { [key]: curr },
              }
            : acc,
        {},
      );
    }),
  };
});
