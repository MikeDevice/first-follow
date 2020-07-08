const { union, uniq } = require('../lib/helpers');

describe('Tests for "union" function', () => {
  const arr1 = [1, 2, 3];
  const arr2 = ['a', 'b', 'c'];

  test('Call function with the same arrays', () => {
    expect(union(arr1, arr1)).toEqual(arr1);
  });

  test('Call function with different arrays', () => {
    expect(union(arr1, arr2)).toEqual([...arr1, ...arr2]);
  });

  test('Call function with mixed array values', () => {
    expect(union([...arr1, arr2[0]], [...arr2, ...arr1])).toEqual([...arr1, ...arr2]);
  });
});

describe('Tests for "uniq" function', () => {
  const arr = [1, 'a', 0, null];

  test('Call function without identical values', () => {
    expect(uniq(arr)).toEqual(arr);
  });

  test('Call function with identical values', () => {
    const arrWithIdenticalValues = arr.concat(arr);

    expect(uniq(arrWithIdenticalValues)).toEqual(arr);
  });
});
