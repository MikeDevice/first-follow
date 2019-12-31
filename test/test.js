const { Grammar } = require('../index');
const { grammars } = require('./fixtures');
const { checkSetHash } = require('./helpers');

describe('First set', () => {
  grammars.forEach((grammarFixture, index) => {
    it(`Test grammar #${index + 1}`, () => {
      const grammar = new Grammar(grammarFixture.rules);

      checkSetHash(grammar.getFirstSets(), grammarFixture.firstSetHash);
    });
  });
});

describe('Follow set', () => {
  grammars.forEach((grammarFixture, index) => {
    it(`Test grammar #${index + 1}`, () => {
      const grammar = new Grammar(grammarFixture.rules);

      checkSetHash(grammar.getFollowSets(), grammarFixture.followSetHash);
    });
  });
});

describe('Predict set', () => {
  grammars.forEach((grammarFixture, index) => {
    it(`Test grammar #${index + 1}`, () => {
      const grammar = new Grammar(grammarFixture.rules);

      checkSetHash(grammar.getPredictSets(), grammarFixture.predictSets);
    });
  });
});
