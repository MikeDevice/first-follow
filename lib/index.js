const { compact, indexBy, union, uniq } = require('./helpers');

const EMPTY_CHAIN = null;
const END_MARKER = '\0';

module.exports = (rules) => {
  const nonterminals = uniq(rules.map(({ left }) => left));
  const nonterminalsHash = indexBy(nonterminals);

  function isNonterminal(item) {
    return nonterminalsHash[item];
  }

  function isTerminal(item) {
    return item !== EMPTY_CHAIN && !isNonterminal(item);
  }

  function createEmptySets() {
    const sets = {};

    nonterminals.forEach((nonterminal) => {
      sets[nonterminal] = [];
    });

    return sets;
  }

  function collectSet(initialSet, items, firstSets, additionalSet) {
    let set = initialSet;

    items.every((item, index) => {
      if (isNonterminal(item)) {
        set = union(set, compact(firstSets[item]));

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
    const firstSets = createEmptySets();
    let isSetChanged;

    do {
      isSetChanged = false;

      rules.forEach(({ left, right }) => {
        const nonterminal = left;
        let set = firstSets[nonterminal];

        set = union(set, collectSet(set, right, firstSets, [EMPTY_CHAIN]));

        if (firstSets[nonterminal].length !== set.length) {
          firstSets[nonterminal] = set;
          isSetChanged = true;
        }
      });
    } while (isSetChanged);

    return firstSets;
  }

  function makeFollowSets(firstSets) {
    const followSets = createEmptySets();
    const startNonterminal = rules[0].left;
    followSets[startNonterminal].push(END_MARKER);

    let isSetChanged;

    do {
      isSetChanged = false;

      rules.forEach(({ left, right }) => {
        right.forEach((item, index) => {
          if (!isNonterminal(item)) return;

          const nonterminal = left;
          const restItems = right.slice(index + 1);
          let set = followSets[item];

          if (restItems.length) {
            set = union(set, collectSet(set, restItems, firstSets, followSets[nonterminal]));
          } else {
            set = union(set, followSets[nonterminal]);
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
      const ruleNumber = ruleIndex + 1;
      const firstItem = right[0];
      let set = [];

      if (isTerminal(firstItem)) {
        set.push(firstItem);
      } else if (isNonterminal(firstItem)) {
        set = union(set, collectSet(set, right, firstSets, followSets[left]));
      } else {
        set = [...followSets[left]];
      }

      predictSets[ruleNumber] = set;
    });

    return predictSets;
  }

  const firstSets = makeFirstSets();
  const followSets = makeFollowSets(firstSets);
  const predictSets = makePredictSets(firstSets, followSets);

  return { firstSets, followSets, predictSets };
};
