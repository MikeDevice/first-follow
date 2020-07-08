const { union, uniq } = require('./helpers');

const EMPTY_CHAIN = null;
const END_MARKER = '\0';

module.exports = (rules) => {
  const nonterminals = uniq(rules.map(({ left }) => left));

  function makeNonterminalsSets() {
    const sets = {};

    nonterminals.forEach((nonterminal) => {
      sets[nonterminal] = [];
    });

    return sets;
  }

  const nonterminalsHash = makeNonterminalsSets(nonterminals);

  function isNonterminal(item) {
    return nonterminalsHash[item];
  }

  function collectSet(initialSet, items, firstSets, additionalSet) {
    let set = initialSet;

    items.every((item, index) => {
      if (isNonterminal(item)) {
        set = union(set, firstSets[item].filter((setItem) => setItem !== EMPTY_CHAIN));

        if (firstSets[item].includes(EMPTY_CHAIN)) {
          if (items[index + 1]) return true;
          set = union(set, additionalSet);
        }
      } else {
        set = union(set, [item]);
      }
    });

    return set;
  }

  function makeFirstSets() {
    const firstSets = makeNonterminalsSets();
    let isSetChanged;

    do {
      isSetChanged = false;

      rules.forEach(({ left, right }) => {
        let set = firstSets[left];
        set = union(set, collectSet(set, right, firstSets, [EMPTY_CHAIN]));

        if (firstSets[left].length !== set.length) {
          firstSets[left] = set;
          isSetChanged = true;
        }
      });
    } while (isSetChanged);

    return firstSets;
  }

  function makeFollowSets(firstSets) {
    const followSets = makeNonterminalsSets();
    followSets[rules[0].left].push(END_MARKER);

    let isSetChanged;

    do {
      isSetChanged = false;

      rules.forEach(({ left, right }) => {
        right.forEach((item, index) => {
          if (!isNonterminal(item)) return;

          const restItems = right.slice(index + 1);
          let set = followSets[item];

          if (restItems.length) {
            set = union(set, collectSet(set, restItems, firstSets, followSets[left]));
          } else {
            set = union(set, followSets[left]);
          }
          if (followSets[item].length !== set.length) {
            followSets[item] = set;
            isSetChanged = true;
          }
        });
      });
    } while (isSetChanged);

    return followSets;
  }

  function makePredictSets(firstSets, followSets) {
    const predictSets = {};

    rules.forEach(({ left, right }, ruleIndex) => {
      const firstItem = right[0];
      let set = [];

      if (isNonterminal(firstItem)) {
        set = union(set, collectSet(set, right, firstSets, followSets[left]));
      } else if (firstItem === EMPTY_CHAIN) {
        set = [...followSets[left]];
      } else {
        set.push(firstItem);
      }

      predictSets[ruleIndex + 1] = set;
    });

    return predictSets;
  }

  const firstSets = makeFirstSets();
  const followSets = makeFollowSets(firstSets);
  const predictSets = makePredictSets(firstSets, followSets);

  return { firstSets, followSets, predictSets };
};
