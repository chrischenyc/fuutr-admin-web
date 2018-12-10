const trunc = (string, n, useWordBoundary) => {
  if (string.length <= n) {
    return string;
  }
  const subString = string.substr(0, n - 1);
  return `${useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString}...`;
};

export const shortenedId = id => trunc(id, 8, false);
