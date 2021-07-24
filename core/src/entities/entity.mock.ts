export function generateMockEntityBase() {
  const mockDate = new Date('2020-01-01');
  return {
    createdAt: mockDate,
    updatedAt: mockDate,
  };
}
