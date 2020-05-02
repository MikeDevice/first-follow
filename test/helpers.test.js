const { compact, indexBy, union, uniq } = require('../lib/helpers');

describe('Tests for "compact" function', () => {
  const arr = [1, 'a', ['1'], { a: 'b' }];

  test('Call function without falsy array values', () => {
    expect(compact(arr)).toEqual(arr);
  });

  test('Call function with falsy array values', () => {
    const arrWithFalsyValues = arr.concat([null, NaN, undefined, 0, '']);

    expect(compact(arrWithFalsyValues)).toEqual(arr);
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

describe('Tests for "indexBy" function', () => {
  const arr = ['a', 'b', 'c'];

  test('Call function', () => {
    const result = indexBy(arr);

    expect(Object.keys(result)).toEqual(arr);
    expect(Object.values(result)).toEqual(arr);
  });
});
