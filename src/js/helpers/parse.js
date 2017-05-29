'use strict';

var _ = require('underscore');

var epsilon = 'ε',
	// eslint-disable-next-line max-len
	regexString = '^(\\S+)\\s*->\\s*(([^\\s' + epsilon + ']+\\s*)+|' + epsilon + ')$',
	regex = new RegExp(regexString);

exports.parseInputRules = function(rules) {
	var data = [];

	_(rules).each(function(rule, index) {
		rule = rule.trim();

		if (rule) {
			var match = rule.match(regex);

			if (match && match[1] && match[2]) {
				data.push({
					left: match[1],
					right: match[2] === epsilon ? [null] : match[2].split(/\s+/)
				});
			} else {
				throw new SyntaxError('SyntaxError at rule #' + (index + 1) + ': ' + rule);
			}
		}
	});

	return data;
};
