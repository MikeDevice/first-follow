const expect = require('expect.js');

exports.checkSetHash = (expectedSetHash, setHash) => {
  const expectedKeys = Object.keys(expectedSetHash).sort();
  const keys = Object.keys(setHash).sort();

  expect(expectedKeys).to.eql(keys);

  Object.entries(expectedSetHash).forEach(([left, right]) => {
    expect(right.sort()).to.eql(setHash[left].sort());
  });
};
