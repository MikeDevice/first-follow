const { indexBy } = require('../lib/helpers');


describe('Tests for "indexBy" function', () => {
  const arr = ['a', 'b', 'c'];

  test('Call function without "iteratee" function', () => {
    const result = indexBy(arr);

    expect(Object.keys(result)).toEqual(arr);
    expect(Object.values(result)).toEqual(arr);
  });

  test('Call function with "iteratee" function', () => {
    const iteratee = (item, index) => item.toUpperCase() + index;
    const result = indexBy(arr, iteratee);

    expect(Object.keys(result)).toEqual(arr.map(iteratee));
    expect(Object.values(result)).toEqual(arr);
  });
});
