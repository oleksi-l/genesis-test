function createIndexedMap<T extends { id: number }>(array: T[]) {
  return new Map(array.map((item) => [item.id, item]));
}

export default createIndexedMap;
