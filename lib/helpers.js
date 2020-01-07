const { EMPTY_CHAIN } = require('./constants');

exports.addToSet = (dest, src, { skipEmptyChain } = {}) => new Set([
  ...dest,
  ...skipEmptyChain
    ? [...src].filter((item) => item !== EMPTY_CHAIN)
    : src,
]);

exports.mapSetsToArrays = (sets) => {
  const result = {};

  Object.keys(sets).map((key) => {
    result[key] = [...sets[key]];
  });

  return result;
};

exports.indexBy = (arr, func) => {
  const iteratee = func || ((a) => a);
  const result = {};

  arr.forEach((item, index) => {
    const key = iteratee(item, index);
    result[key] = item;
  });

  return result;
};
