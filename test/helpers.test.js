const { EMPTY_CHAIN } = require('../lib/constants');
const { addToSet, mapSetsToArrays, indexBy } = require('../lib/helpers');

describe('Tests for "addToSet" function', () => {
  const a = new Set([1, 2, 3]);
  const b = new Set([4, 5, EMPTY_CHAIN]);

  test('Without options', () => {
    const result = addToSet(a, b);

    expect(result).toEqual(new Set([...a, ...b]));
  });

  test('With "skipEmptyChain" option', () => {
    const result = addToSet(a, b, { skipEmptyChain: true });
    const set = new Set([...a, ...b]);
    set.delete(EMPTY_CHAIN);

    expect(result).toEqual(set);
  });

  test('With "skipEmptyChain" option without empty chain in second argument', () => {
    const result = addToSet(b, a, { skipEmptyChain: true });

    expect(result).toEqual(new Set([...a, ...b]));
  });
});

describe('Tests for "mapSetsToArrays" function', () => {
  const sets = {
    A: new Set([1, 2]),
    B: new Set([3]),
  };

  test('Call function', () => {
    const result = mapSetsToArrays(sets);

    expect(Object.keys(result)).toEqual(Object.keys(sets));
    expect(Object.values(result)).toEqual(Object.values(sets).map((arr) => [...arr]));
  });
});

describe('Tests for "indexBy" function', () => {
  const arr = ['a', 'b', 'c'];

  test('Without "iteratee" function', () => {
    const result = indexBy(arr);

    expect(Object.keys(result)).toEqual(arr);
    expect(Object.values(result)).toEqual(arr);
  });

  test('With "iteratee" function', () => {
    const iteratee = (item, index) => item.toUpperCase() + index;
    const result = indexBy(arr, iteratee);

    expect(Object.keys(result)).toEqual(arr.map(iteratee));
    expect(Object.values(result)).toEqual(arr);
  });
});
