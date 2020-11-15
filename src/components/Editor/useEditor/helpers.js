export const findWithRegex = (regex, text, callback) => {
  let matchResult = regex.exec(text);

  while (matchResult) {
    const start = matchResult.index;
    const end = start + matchResult[0].length;

    callback(start, end);

    matchResult = regex.exec(text);
  }
};
