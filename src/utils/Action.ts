export const getKeyItem = (key: string): any | null => {
  let item;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    item = localStorage.getItem(key);
  }
  return item ? item : null;
};

export const setKeyItem = (key: string, value: Record<string, any>): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
