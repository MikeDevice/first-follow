const _ = require('underscore');
const helpers = require('./helpers');

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

    this.nonterminals = this.getNonterminals();
    this.nonterminalsHash = _(this.nonterminals).indexBy();
    this.terminals = this.getTerminals();
  }

  // getFirstSets() {
  //   return this.firstSets;
  // }

  // getFollowSets() {
  //   return this.followSets;
  // }

  // getPredictSets() {
  //   return this.predictSets;
  // }

  getNonterminals() {
    return _(this.rules).chain()
      .pluck('left')
      .uniq()
      .value();
  }

  getTerminals() {
    const terminals = [];

    _(this.rules).each((rule) => {
      _(rule.right).each((item) => {
        if (this.isTerminal()) {
          terminals.push(item);
        }
      });
    });

    return terminals;
  }

  isNonterminal(item) {
    return this.nonterminalsHash[item];
  }

  isTerminal(item) {
    return item && !this.isNonterminal(item);
  }
};
