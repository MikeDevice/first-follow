export const findWithRegex = (regex, text, callback) => {
  let matchResult = regex.exec(text);

  while (matchResult) {
    const start = matchResult.index;
    const end = start + matchResult[0].length;

    callback(start, end, matchResult);

    matchResult = regex.exec(text);
  }
};

export function findWithRegexNew(data, text, callback) {
  const {
    content,
    contentBefore = '',
    contentAfter = '',
    caseInsensitive = false,
  } = data;

  const regex = new RegExp(
    `(${contentBefore})(${content})(${contentAfter})`,
    `${caseInsensitive ? 'gi' : 'g'}`,
  );

  findWithRegex(regex, text, (start, end, match) => {
    const [, beforeMatch, , afterMatch] = match;

    callback(start + beforeMatch.length, end - afterMatch.length);
  });
}
