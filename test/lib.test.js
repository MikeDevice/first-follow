const firstFollow = require('../index');
const { grammars } = require('./fixtures');

function testSets(text, expectedSets, actualSets) {
  const expectedKeys = Object.keys(expectedSets).sort();
  const actialKeys = Object.keys(actualSets).sort();

  test(text, () => {
    expect(expectedKeys).toEqual(actialKeys);

    Object.entries(expectedSets).forEach(([left, right]) => {
      expect(right.sort()).toEqual(actualSets[left].sort());
    });
  });
}

grammars.forEach((grammarFixture, index) => {
  describe(`Grammar #${index + 1}`, () => {
    const { firstSets, followSets, predictSets } = firstFollow(grammarFixture.rules);

    testSets('First sets', firstSets, grammarFixture.firstSets);
    testSets('Follow sets', followSets, grammarFixture.followSets);
    testSets('Predict sets', predictSets, grammarFixture.predictSets);
  });
});
