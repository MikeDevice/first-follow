exports.uniq = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);

exports.union = (arr1, arr2) => exports.uniq(arr1.concat(arr2));

exports.compact = (arr) => arr.filter(Boolean);

exports.indexBy = (arr) => {
  const result = {};

  arr.forEach((item) => {
    result[item] = item;
  });

  return result;
};
