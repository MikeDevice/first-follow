const _ = require('underscore');
const { Grammar } = require('../index');
const grammarFixtures = require('./fixtures').grammars;
const helpers = require('./helpers');

describe('First set', () => {
  _(grammarFixtures).each((grammarFixture, index) => {
    it(`Test grammar #${index + 1}`, () => {
      const grammar = new Grammar(grammarFixture.rules);

      helpers.checkSetHash(grammar.getFirstSets(), grammarFixture.firstSetHash);
    });
  });
});

describe('Follow set', () => {
  _(grammarFixtures).each((grammarFixture, index) => {
    it(`Test grammar #${index + 1}`, () => {
      const grammar = new Grammar(grammarFixture.rules);

      helpers.checkSetHash(grammar.getFollowSets(),
        grammarFixture.followSetHash);
    });
  });
});

describe('Predict set', () => {
  _(grammarFixtures).each((grammarFixture, index) => {
    it(`Test grammar #${index + 1}`, () => {
      const grammar = new Grammar(grammarFixture.rules);

      helpers.checkPredictSets(grammar.getPredictSets(),
        grammarFixture.predictSets);
    });
  });
});
