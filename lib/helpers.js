const { EMPTY_CHAIN } = require('./constants');

exports.addToSet = (dest, src, { skipEmptyChain } = {}) => {
  const resultSet = new Set(src);

  if (skipEmptyChain) {
    resultSet.delete(EMPTY_CHAIN);
  }

  dest.forEach((value) => {
    resultSet.add(value);
  });

  return resultSet;
};

exports.mapSetsToArrays = (sets) => {
  const result = {};

  Object.keys(sets).map((key) => {
    result[key] = Array.from(sets[key]);
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
