export const prettifyURL = (url: string): string => {
  const u = new URL(url);
  return `${u.protocol}//${u.hostname}`;
};
