const { EMPTY_CHAIN, END_MARKER } = require('./constants');
const { addToSet, mapSetsToArrays, indexBy } = require('./helpers');

/**
 * Class representing a Grammar.
 */
module.exports = class Grammar {
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
    return mapSetsToArrays(this.firstSets);
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
    return mapSetsToArrays(this.followSets);
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
    return mapSetsToArrays(this.predictSets);
  }

  _getNonterminals() {
    const nonterminals = this.rules.map(({ left }) => left);

    return nonterminals
      .filter((item, index) => nonterminals.indexOf(item) === index);
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
      sets[nonterminal] = new Set();
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
        const setSizeBefore = set.size;

        right.every((item, index) => {
          if (this._isNonterminal(item)) {
            set = addToSet(set, firstSets[item], { skipEmptyChain: true });

            if (firstSets[item].has(EMPTY_CHAIN)) {
              if (right[index + 1]) return true;

              set.add(EMPTY_CHAIN);
            }
          } else if (this._isTerminal(item)) {
            set.add(item);
          } else {
            set.add(EMPTY_CHAIN);
          }
        });

        if (setSizeBefore !== set.size) {
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

    followSets[startNonterminal].add(END_MARKER);

    do {
      isSetChanged = false;

      this.rules.forEach(({ left, right }) => {
        right.forEach((item, index) => {
          if (!this._isNonterminal(item)) return;

          const nonterminal = left;
          const restItems = right.slice(index + 1);
          let set = followSets[item];
          const setSizeBefore = set.size;

          if (restItems.length) {
            restItems.every((restItem, restIndex) => {
              if (this._isNonterminal(restItem)) {
                set = addToSet(set, this.firstSets[restItem], { skipEmptyChain: true });

                if (this.firstSets[restItem].has(EMPTY_CHAIN)) {
                  if (restItems[restIndex + 1]) return true;

                  set = addToSet(set, followSets[nonterminal]);
                }
              } else {
                set.add(restItem);
              }
            });
          } else {
            set = addToSet(set, followSets[nonterminal]);
          }

          if (setSizeBefore !== set.size) {
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
      predictSets[ruleNumber] = new Set();

      const firstItem = right[0];
      let set = predictSets[ruleNumber];

      if (this._isTerminal(firstItem)) {
        set.add(firstItem);
      } else if (this._isNonterminal(firstItem)) {
        right.every((item, index) => {
          if (this._isNonterminal(item)) {
            set = addToSet(set, this.firstSets[item], { skipEmptyChain: true });

            if (this.firstSets[item].has(EMPTY_CHAIN)) {
              if (right[index + 1]) return true;

              set = addToSet(set, this.followSets[left]);
            }
          } else {
            set.add(item);
          }
        });
      } else {
        set = new Set(this.followSets[left]);
      }

      predictSets[ruleNumber] = set;
    });

    return predictSets;
  }
};
