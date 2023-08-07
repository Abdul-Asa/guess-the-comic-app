export const getVoteItem = (key: string): any | null => {
  const item = localStorage.getItem(key);
  return item ? item : null;
};

export const setVoteItem = (
  key: string,
  value: Record<string, boolean>
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
