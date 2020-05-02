const { compact, indexBy, union, uniq } = require('./helpers');

const EMPTY_CHAIN = null;
const END_MARKER = '\0';

/**
 * Class representing a Grammar.
 */
exports.Grammar = class Grammar {
  /**
   * Create a Grammar.
   * @param {Array.<object>} rules The array of rules.
   *
   * @example
   * const { Grammar } = require('first-follow');
   * const grammar = new Grammar([{
   *   left: 'S',
   *   right: ['a']
   * }]);
   */
  constructor(rules) {
    this.rules = rules;

    this.nonterminals = this._getNonterminals();
    this.nonterminalsHash = indexBy(this.nonterminals);

    this.firstSets = this._makeFirstSets();
    this.followSets = this._makeFollowSets();
    this.predictSets = this._makePredictSets();
  }

  /**
   * Get first sets for the grammar.
   *
   * @return {Object.<string, Array.<string>>} The object that represents the first sets.
   *
   * @example
   * const { Grammar } = require('first-follow');
   * const grammar = new Grammar([{
   *   left: 'S',
   *   right: ['a']
   * }]);
   *
   * grammar.getFirstSets(); //=> { S: ['a'] }
   */
  getFirstSets() {
    return this.firstSets;
  }

  /**
   * Get follow sets for the grammar.
   *
   * @return {Object.<string, Array.<string>>} The object that represents the follow sets.
   *
   * @example
   * const { Grammar } = require('first-follow');
   * const grammar = new Grammar([{
   *   left: 'S',
   *   right: ['a']
   * }]);
   *
   * grammar.getFollowSets(); //=> { S: ['\u0000'] }
   */
  getFollowSets() {
    return this.followSets;
  }

  /**
   * Get predict sets for the grammar.
   *
   * @return {Object.<string, Array.<string>>} The object that represents the predict sets.
   *
   * @example
   * const { Grammar } = require('first-follow');
   * const grammar = new Grammar([{
   *   left: 'S',
   *   right: ['a']
   * }]);
   *
   * grammar.getPredictSets(); //=> { '1': ['a'] }
   */
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

            if (firstSets[item].includes(EMPTY_CHAIN)) {
              if (nextItem) return true;
              set = union(set, [EMPTY_CHAIN]);
            }
          } else if (this._isTerminal(item)) {
            set = union(set, [item]);
          } else {
            set = union(set, [EMPTY_CHAIN]);
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

                if (this.firstSets[restItem].includes(EMPTY_CHAIN)) {
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
    const predictSets = {};

    this.rules.forEach(({ left, right }, ruleIndex) => {
      const ruleNumber = ruleIndex + 1;
      const firstItem = right[0];
      let set = [];

      if (this._isTerminal(firstItem)) {
        set.push(firstItem);
      } else if (this._isNonterminal(firstItem)) {
        right.every((item, index) => {
          if (this._isNonterminal(item)) {
            set = union(set, compact(this.firstSets[item]));

            if (this.firstSets[item].includes(EMPTY_CHAIN)) {
              if (right[index + 1]) return true;

              set = union(set, this.followSets[left]);
            }
          } else {
            set = union(set, [item]);
          }
        });
      } else {
        set = [...this.followSets[left]];
      }

      predictSets[ruleNumber] = set;
    });

    return predictSets;
  }
};
