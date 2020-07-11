const EMPTY_CHAIN = null;
const END_MARKER = '\0';

module.exports = (rules) => {
  let firstSets = {};
  let followSets = {};
  let predictSets = {};

  rules.map(({ left }) => {
    firstSets[left] = [];
    followSets[left] = [];
  });

  function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
  }

  function isNonterminal(item) {
    return firstSets[item];
  }

  function collectSet(initialSet, items, additionalSet) {
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
    let isSetChanged;

    do {
      isSetChanged = false;

      rules.forEach(({ left, right }) => {
        let set = firstSets[left];
        set = union(set, collectSet(set, right, [EMPTY_CHAIN]));

        if (firstSets[left].length !== set.length) {
          firstSets[left] = set;
          isSetChanged = true;
        }
      });
    } while (isSetChanged);

    return firstSets;
  }

  function makeFollowSets() {
    followSets[rules[0].left].push(END_MARKER);

    let isSetChanged;

    do {
      isSetChanged = false;

      rules.forEach(({ left, right }) => {
        right.forEach((item, index) => {
          if (!isNonterminal(item)) return;

          let set = followSets[item];

          set = union(
            set,
            index + 1 < right.length
              ? collectSet(set, right.slice(index + 1), followSets[left])
              : followSets[left],
          );

          if (followSets[item].length !== set.length) {
            followSets[item] = set;
            isSetChanged = true;
          }
        });
      });
    } while (isSetChanged);

    return followSets;
  }

  function makePredictSets() {
    rules.forEach(({ left, right }, ruleIndex) => {
      const firstItem = right[0];
      let set = [];

      if (isNonterminal(firstItem)) {
        set = union(set, collectSet(set, right, followSets[left]));
      } else if (firstItem === EMPTY_CHAIN) {
        set = [...followSets[left]];
      } else {
        set.push(firstItem);
      }

      predictSets[ruleIndex + 1] = set;
    });

    return predictSets;
  }

  firstSets = makeFirstSets();
  followSets = makeFollowSets();
  predictSets = makePredictSets();

  return { firstSets, followSets, predictSets };
};
