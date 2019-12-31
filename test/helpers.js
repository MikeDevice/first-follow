const expect = require('expect.js');
const {
  compact,
  indexBy,
  union,
  uniq,
} = require('../lib/helpers');

describe('Helpers tests', () => {
  describe('Tests for "compact" function', () => {
    const arr = [1, 'a', ['1'], { a: 'b' }];

    it('Call function without falsy array values', () => {
      expect(compact(arr)).to.eql(arr);
    });

    it('Call function with falsy array values', () => {
      const arrWithFalsyValues = arr.concat([null, NaN, undefined, 0, '']);

      expect(compact(arrWithFalsyValues)).to.eql(arr);
    });
  });

  describe('Tests for "uniq" function', () => {
    const arr = [1, 'a', 0, null];

    it('Call function without identical values', () => {
      expect(uniq(arr)).to.eql(arr);
    });

    it('Call function with identical values', () => {
      const arrWithIdenticalValues = arr.concat(arr);

      expect(uniq(arrWithIdenticalValues)).to.eql(arr);
    });
  });

  describe('Tests for "union" function', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['a', 'b', 'c'];

    it('Call function with the same arrays', () => {
      expect(union(arr1, arr1)).to.eql(arr1);
    });

    it('Call function with different arrays', () => {
      expect(union(arr1, arr2)).to.eql([...arr1, ...arr2]);
    });

    it('Call function with mixed array values', () => {
      expect(union([...arr1, arr2[0]], [...arr2, ...arr1])).to.eql([...arr1, ...arr2]);
    });
  });

  describe('Tests for "indexBy" function', () => {
    const arr = ['a', 'b', 'c'];

    it('Call function without "iteratee" function', () => {
      const result = indexBy(arr);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.eql(arr);
      expect(Object.values(result)).to.eql(arr);
    });

    it('Call function with "iteratee" function', () => {
      const iteratee = (item, index) => item.toUpperCase() + index;
      const result = indexBy(arr, iteratee);

      expect(result).to.be.an('object');
      expect(Object.keys(result)).to.eql(arr.map(iteratee));
      expect(Object.values(result)).to.eql(arr);
    });
  });
});
