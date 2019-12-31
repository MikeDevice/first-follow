const expect = require('expect.js');
const { Grammar } = require('../index');
const { grammars } = require('./fixtures');

function checkSetHash(expectedSetHash, setHash) {
  const expectedKeys = Object.keys(expectedSetHash).sort();
  const keys = Object.keys(setHash).sort();

  expect(expectedKeys).to.eql(keys);

  Object.entries(expectedSetHash).forEach(([left, right]) => {
    expect(right.sort()).to.eql(setHash[left].sort());
  });
}

describe('Library tests', () => {
  describe('First set', () => {
    grammars.forEach((grammarFixture, index) => {
      it(`Test for a grammar #${index + 1}`, () => {
        const grammar = new Grammar(grammarFixture.rules);

        checkSetHash(grammar.getFirstSets(), grammarFixture.firstSetHash);
      });
    });
  });

  describe('Follow set', () => {
    grammars.forEach((grammarFixture, index) => {
      it(`Test for a grammar #${index + 1}`, () => {
        const grammar = new Grammar(grammarFixture.rules);

        checkSetHash(grammar.getFollowSets(), grammarFixture.followSetHash);
      });
    });
  });

  describe('Predict set', () => {
    grammars.forEach((grammarFixture, index) => {
      it(`Test for a grammar #${index + 1}`, () => {
        const grammar = new Grammar(grammarFixture.rules);

        checkSetHash(grammar.getPredictSets(), grammarFixture.predictSets);
      });
    });
  });
});
