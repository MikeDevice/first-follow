const { END_MARKER } = require('./constants');
const {
  compact,
  indexBy,
  union,
  uniq,
} = require('./helpers');

/**
 * Class representing a Grammar.
 */
module.exports = class Grammar {
  /**
   * Create a Grammar.
   * @param {array} rules -- The array of rules.
   */
  constructor(rules) {
    this.rules = rules;

    this.nonterminals = this._getNonterminals();
    this.nonterminalsHash = indexBy(this.nonterminals);

    this.firstSets = this._makeFirstSets();
    this.followSets = this._makeFollowSets();
    this.predictSets = this._makePredictSets();
  }

  getFirstSets() {
    return this.firstSets;
  }

  getFollowSets() {
    return this.followSets;
  }

  getPredictSets() {
    return this.predictSets;
  }

  _getNonterminals() {
    return uniq(this.rules.map(({ left }) => left));
  }

  _isNonterminal(item) {
    return this.nonterminalsHash[item];
  }

  _isTerminal(item) {
    return item && !this._isNonterminal(item);
  }

  _createEmptySets() {
    const sets = {};

    this.nonterminals.forEach((nonterminal) => {
      sets[nonterminal] = [];
    });

    return sets;
  }

  _makeFirstSets() {
    const firstSets = this._createEmptySets();
    let isSetChanged;

    do {
      isSetChanged = false;

      this.rules.forEach(({ left, right }) => {
        const nonterminal = left;
        let set = firstSets[nonterminal];

        right.every((item, index) => {
          if (this._isNonterminal(item)) {
            set = union(set, compact(firstSets[item]));

            const nextItem = right[index + 1];

            if (firstSets[item].includes(null)) {
              if (nextItem) return true;
              set = union(set, [null]);
            }
          } else if (this._isTerminal(item)) {
            set = union(set, [item]);
          } else {
            set = union(set, [null]);
          }
        });

        if (firstSets[nonterminal].length !== set.length) {
          firstSets[nonterminal] = set;
          isSetChanged = true;
        }
      });
    } while (isSetChanged);

    return firstSets;
  }

  _makeFollowSets() {
    const startNonterminal = this.rules[0].left;
    const followSets = this._createEmptySets();
    let isSetChanged;

    followSets[startNonterminal].push(END_MARKER);

    do {
      isSetChanged = false;

      this.rules.forEach(({ left, right }) => {
        right.forEach((item, index) => {
          if (!this._isNonterminal(item)) return;

          const nonterminal = left;
          const restItems = right.slice(index + 1);
          let set = followSets[item];

          if (restItems.length) {
            restItems.every((restItem, restIndex) => {
              if (this._isNonterminal(restItem)) {
                set = union(set, compact(this.firstSets[restItem]));
                const nextItem = restItems[restIndex + 1];

                if (this.firstSets[restItem].includes(null)) {
                  if (nextItem) return true;
                  set = union(set, followSets[nonterminal]);
                }
              } else {
                set = union(set, [restItem]);
              }
            });
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

  _makePredictSets() {
    const predictSets = [];

    this.rules.forEach(({ left, right }, ruleIndex) => {
      predictSets.push([]);

      const items = right;
      const nonterminal = left;
      const firstItem = items[0];

      if (this._isTerminal(firstItem)) {
        predictSets[ruleIndex].push(firstItem);
      } else if (this._isNonterminal(firstItem)) {
        right.every((item, index) => {
          if (this._isNonterminal(item)) {
            predictSets[ruleIndex] = union(
              predictSets[ruleIndex],
              compact(this.firstSets[item]),
            );

            if (this.firstSets[item].includes(null)) {
              if (right[index + 1]) return true;

              predictSets[ruleIndex] = union(
                predictSets[ruleIndex],
                this.followSets[nonterminal],
              );
            }
          } else {
            predictSets[ruleIndex] = union(
              predictSets[ruleIndex],
              [item],
            );
          }
        });
      } else {
        predictSets[ruleIndex] = [
          ...this.followSets[nonterminal],
        ];
      }
    });

    return indexBy(predictSets, (val, key) => key + 1);
  }
};
