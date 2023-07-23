// Adapted from https://stackoverflow.com/a/26177872

export function storageMock(initialState?: { [key: string]: string }) {
  let storage: { [key: string]: string } = initialState || {};

  return {
    setItem(key: string, value: string) {
      storage[key] = value || '';
    },
    getItem(key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem(key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i: number) {
      const keys = Object.keys(storage);

      return keys[i] || null;
    },
    clear() {
      storage = {};
    },
  };
}
