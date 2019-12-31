exports.uniq = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);

exports.union = (arr1, arr2) => exports.uniq(arr1.concat(arr2));

exports.compact = (arr) => arr.filter((item) => item);

exports.indexBy = (arr, func) => {
  const iteratee = func || ((a) => a);
  const result = {};

  arr.forEach((item, index) => {
    const key = iteratee(item, index);
    result[key] = item;
  });

  return result;
};
