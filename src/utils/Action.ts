export const getVoteItem = (key: string): any | null => {
  let item;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    item = localStorage.getItem(key);
  }
  return item ? item : null;
};

export const setVoteItem = (
  key: string,
  value: Record<string, boolean>
): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
