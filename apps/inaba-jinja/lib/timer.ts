export const delay = (seconds = 1): Promise<void> =>
  // oxlint-disable-next-line promise/avoid-new -- setTimeout has no Promise-based API in browsers.
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
