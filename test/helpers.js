const _ = require('underscore');
const expect = require('expect.js');

exports.checkSetHash = (expectedSetHash, setHash) => {
  const expectedKeys = _(expectedSetHash).chain()
    .keys()
    .sort()
    .value();

  const keys = _(setHash).chain()
    .keys()
    .sort()
    .value();

  expect(expectedKeys).to.eql(keys);

  _(expectedSetHash).each((right, left) => {
    expect(_(right).sort()).to.eql(_(setHash[left]).sort());
  });
};

exports.checkPredictSets = (expectedPredictSets, predictSets) => {
  expect(_(expectedPredictSets).size()).to.equal(_(predictSets).size());

  _(expectedPredictSets).each((expectedSets, index) => {
    expect(_(expectedSets).sort()).to.eql(_(predictSets[index]).sort());
  });
};
