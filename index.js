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

		this.firstSetHash = this.makeFirstSet();
		this.followSetHash = this.makeFollowSet();
		this.predictSets = this.makePredictSet();
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

	Grammar.prototype._initSetHash = function() {
		var setHash = {};

		_(this.nonterminals).each(function(nonterminal) {
			setHash[nonterminal] = [];
		});

		return setHash;
	};

	Grammar.prototype.isNonterminal = function(item) {
		return this.nonterminalsHash[item];
	};

	Grammar.prototype.isTerminal = function(item) {
		return item && !this.isNonterminal(item);
	};

	Grammar.prototype.getFirstSetHash = function() {
		return this.firstSetHash;
	};

	Grammar.prototype.getFollowSetHash = function() {
		return this.followSetHash;
	};

	Grammar.prototype.getPredictSets = function() {
		return this.predictSets;
	};

	Grammar.prototype.makeFirstSet = function() {
		var self = this,
			firstSetHash = this._initSetHash(),
			isSetChanged;

		do {
			isSetChanged = false;

			_(this.rules).each(function(rule) {
				var nonterminal = rule.left,
					set = firstSetHash[nonterminal];

				_(rule.right).every(function(item, index) {
					if (self.isNonterminal(item)) {
						set = _.union(set, _(firstSetHash[item]).compact());

						var nextItem = rule.right[index + 1];

						if (_(firstSetHash[item]).contains(null)) {
							if (nextItem) return true;
							set = _.union(set, [null]);
						}

					} else if (self.isTerminal(item)) {
						set = _.union(set, [item]);
					} else {
						set = _.union(set, [null]);
					}
				});

				if (firstSetHash[nonterminal].length !== set.length) {
					firstSetHash[nonterminal] = set;
					isSetChanged = true;
				}
			});
		} while (isSetChanged);

		return firstSetHash;
	};

	Grammar.prototype.makeFollowSet = function() {
		var self = this,
			startNonterminal = this.rules[0].left,
			followSetHash = this._initSetHash(),
			isSetChanged;

		followSetHash[startNonterminal].push(this.endMarker);

		do {
			isSetChanged = false;

			_(this.rules).each(function(rule) {
				_(rule.right).each(function(item, index) {
					if (!self.isNonterminal(item)) return;

					var nonterminal = rule.left,
						set = followSetHash[item],
						restItems = _(rule.right).rest(index + 1);

					if (restItems.length) {
						_(restItems).every(function(item, index) {
							if (self.isNonterminal(item)) {
								set = _.union(set, _(self.firstSetHash[item]).compact());
								var nextItem = restItems[index + 1];

								if (_(self.firstSetHash[item]).contains(null)) {
									if (nextItem) return true;
									set = _.union(set, followSetHash[nonterminal]);
								}

							} else {
								set = _.union(set, [item]);
							}
						});
					} else {
						set = _.union(set, followSetHash[nonterminal]);
					}
					if (followSetHash[item].length !== set.length) {
						followSetHash[item] = set;
						isSetChanged = true;
					}
				});
			});
		} while (isSetChanged);
		return followSetHash;
	};

	Grammar.prototype.makePredictSet = function() {
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
							_(self.firstSetHash[item]).compact()
						);

						if (_(self.firstSetHash[item]).contains(null)) {
							if (rule.right[index + 1]) return true;

							predictSets[ruleIndex] = _.union(
								predictSets[ruleIndex],
								self.followSetHash[nonterminal]
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
				predictSets[ruleIndex] = _(self.followSetHash[nonterminal]).clone();
			}
		});

		return _(predictSets).indexBy(function(val, key) {
			return key + 1;
		});
	};

	return {Grammar: Grammar};
}));
