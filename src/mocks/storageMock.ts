// Adapted from https://stackoverflow.com/a/26177872

export function storageMock(initialState?: { [key: string]: string }) {
  let storage: { [key: string]: string } = initialState || {};

  return {
    setItem: function (key: string, value: string) {
      storage[key] = value || '';
    },
    getItem: function (key: string) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function (key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function (i: number) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: function () {
      storage = {};
    },
  };
}
