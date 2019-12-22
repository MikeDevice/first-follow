'use strict';

(function(root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('underscore'));
  } else if (typeof define === 'function' && define.amd) {
    define(['underscore'], factory);
  } else {
    root.Grammar = factory(root._).Grammar;
  }
}(this, function(_) {
  var Grammar = function(rules) {
    this.rules = rules || [];
    this.endMarker = '\0';

    this.nonterminals = this._getNonterminals();
    this.nonterminalsHash = _(this.nonterminals).indexBy();
    this.terminals = this._getTerminals();

    this.firstSets = this.makeFirstSets();
    this.followSets = this.makeFollowSets();
    this.predictSets = this.makePredictSets();
  };

  Grammar.prototype._getNonterminals = function() {
    return _(this.rules).chain()
      .pluck('left')
      .uniq()
      .value();
  };

  Grammar.prototype._getTerminals = function() {
    var self = this,
      terminals = [];

    _(this.rules).each(function(rule) {
      _(rule.right).each(function(item) {
        if (self.isTerminal()) {
          terminals.push(item);
        }
      });
    });

    return terminals;
  };

  Grammar.prototype._initSets = function() {
    var sets = {};

    _(this.nonterminals).each(function(nonterminal) {
      sets[nonterminal] = [];
    });

    return sets;
  };

  Grammar.prototype.isNonterminal = function(item) {
    return this.nonterminalsHash[item];
  };

  Grammar.prototype.isTerminal = function(item) {
    return item && !this.isNonterminal(item);
  };

  Grammar.prototype.getFirstSets = function() {
    return this.firstSets;
  };

  Grammar.prototype.getFollowSets = function() {
    return this.followSets;
  };

  Grammar.prototype.getPredictSets = function() {
    return this.predictSets;
  };

  Grammar.prototype.makeFirstSets = function() {
    var self = this,
      firstSets = this._initSets(),
      isSetChanged;

    do {
      isSetChanged = false;

      _(this.rules).each(function(rule) {
        var nonterminal = rule.left,
          set = firstSets[nonterminal];

        _(rule.right).every(function(item, index) {
          if (self.isNonterminal(item)) {
            set = _.union(set, _(firstSets[item]).compact());

            var nextItem = rule.right[index + 1];

            if (_(firstSets[item]).contains(null)) {
              if (nextItem) return true;
              set = _.union(set, [null]);
            }

          } else if (self.isTerminal(item)) {
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
  };

  Grammar.prototype.makeFollowSets = function() {
    var self = this,
      startNonterminal = this.rules[0].left,
      followSets = this._initSets(),
      isSetChanged;

    followSets[startNonterminal].push(this.endMarker);

    do {
      isSetChanged = false;

      _(this.rules).each(function(rule) {
        _(rule.right).each(function(item, index) {
          if (!self.isNonterminal(item)) return;

          var nonterminal = rule.left,
            set = followSets[item],
            restItems = _(rule.right).rest(index + 1);

          if (restItems.length) {
            _(restItems).every(function(item, index) {
              if (self.isNonterminal(item)) {
                set = _.union(set, _(self.firstSets[item]).compact());
                var nextItem = restItems[index + 1];

                if (_(self.firstSets[item]).contains(null)) {
                  if (nextItem) return true;
                  set = _.union(set, followSets[nonterminal]);
                }

              } else {
                set = _.union(set, [item]);
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
  };

  Grammar.prototype.makePredictSets = function() {
    var self = this,
      predictSets = [];

    _(this.rules).each(function(rule, ruleIndex) {
      predictSets.push([]);

      var items = rule.right,
        nonterminal = rule.left,
        firstItem = items[0];

      if (self.isTerminal(firstItem)) {
        predictSets[ruleIndex].push(firstItem);
      } else if (self.isNonterminal(firstItem)) {
        _(rule.right).every(function(item, index) {
          if (self.isNonterminal(item)) {
            predictSets[ruleIndex] = _.union(
              predictSets[ruleIndex],
              _(self.firstSets[item]).compact()
            );

            if (_(self.firstSets[item]).contains(null)) {
              if (rule.right[index + 1]) return true;

              predictSets[ruleIndex] = _.union(
                predictSets[ruleIndex],
                self.followSets[nonterminal]
              );
            }
          } else {
            predictSets[ruleIndex] = _.union(
              predictSets[ruleIndex],
              [item]
            );
          }
        });
      } else {
        predictSets[ruleIndex] = _(self.followSets[nonterminal]).clone();
      }
    });

    return _(predictSets).indexBy(function(val, key) {
      return key + 1;
    });
  };

  return {Grammar: Grammar};
}));
