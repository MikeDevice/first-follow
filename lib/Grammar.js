const _ = require('underscore');
const { END_MARKER } = require('./constants');

/**
 * Class representing a Grammar.
 */
module.exports = class Grammar {
  /**
   * Create a Grammar.
   * @param {array} rules -- The array of rules.
   */
  constructor(rules = []) {
    this.rules = rules;

    this.nonterminals = this._getNonterminals();
    this.nonterminalsHash = _(this.nonterminals).indexBy();
    this.terminals = this._getTerminals();

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
    return _(this.rules).chain()
      .pluck('left')
      .uniq()
      .value();
  }

  _getTerminals() {
    const terminals = [];

    _(this.rules).each((rule) => {
      _(rule.right).each((item) => {
        if (this._isTerminal()) {
          terminals.push(item);
        }
      });
    });

    return terminals;
  }

  _isNonterminal(item) {
    return this.nonterminalsHash[item];
  }

  _isTerminal(item) {
    return item && !this._isNonterminal(item);
  }

  _createEmptySets() {
    const sets = {};

    _(this.nonterminals).each((nonterminal) => {
      sets[nonterminal] = [];
    });

    return sets;
  }

  _makeFirstSets() {
    const firstSets = this._createEmptySets();
    let isSetChanged;

    do {
      isSetChanged = false;

      _(this.rules).each(({ left, right }) => {
        const nonterminal = left;
        let set = firstSets[nonterminal];

        _(right).every((item, index) => {
          if (this._isNonterminal(item)) {
            set = _.union(set, _(firstSets[item]).compact());

            const nextItem = right[index + 1];

            if (_(firstSets[item]).contains(null)) {
              if (nextItem) return true;
              set = _.union(set, [null]);
            }
          } else if (this._isTerminal(item)) {
            set = _.union(set, [item]);
          } else {
            set = _.union(set, [null]);
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

      _(this.rules).each(({ left, right }) => {
        _(right).each((item, index) => {
          if (!this._isNonterminal(item)) return;

          const nonterminal = left;
          const restItems = _(right).rest(index + 1);
          let set = followSets[item];

          if (restItems.length) {
            _(restItems).every((restItem, restIndex) => {
              if (this._isNonterminal(restItem)) {
                set = _.union(set, _(this.firstSets[restItem]).compact());
                const nextItem = restItems[restIndex + 1];

                if (_(this.firstSets[restItem]).contains(null)) {
                  if (nextItem) return true;
                  set = _.union(set, followSets[nonterminal]);
                }
              } else {
                set = _.union(set, [restItem]);
              }
            });
          } else {
            set = _.union(set, followSets[nonterminal]);
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

    _(this.rules).each(({ left, right }, ruleIndex) => {
      predictSets.push([]);

      const items = right;
      const nonterminal = left;
      const firstItem = items[0];

      if (this._isTerminal(firstItem)) {
        predictSets[ruleIndex].push(firstItem);
      } else if (this._isNonterminal(firstItem)) {
        _(right).every((item, index) => {
          if (this._isNonterminal(item)) {
            predictSets[ruleIndex] = _.union(
              predictSets[ruleIndex],
              _(this.firstSets[item]).compact(),
            );

            if (_(this.firstSets[item]).contains(null)) {
              if (right[index + 1]) return true;

              predictSets[ruleIndex] = _.union(
                predictSets[ruleIndex],
                this.followSets[nonterminal],
              );
            }
          } else {
            predictSets[ruleIndex] = _.union(
              predictSets[ruleIndex],
              [item],
            );
          }
        });
      } else {
        predictSets[ruleIndex] = _(this.followSets[nonterminal]).clone();
      }
    });

    return _(predictSets).indexBy((val, key) => key + 1);
  }
};
