'use strict';

var _ = require('underscore');

var epsilon = 'ε',
	regexString = '^(\\w)\\s*->\\s*([^\\s' + epsilon + ']+|' + epsilon + ')$',
	regex = new RegExp(regexString);

exports.parseInputRules = function(rules) {
	var data = [];

	_(rules).each(function(rule) {
		rule = rule.trim();

		if (rule) {
			var match = rule.match(regex);

			if (match && match[1] && match[2]) {
				data.push({
					left: match[1],
					right: match[2] === epsilon ? [null] : match[2].split('')
				});
			} else {
				throw new Error();
			}
		}
	});

	return data;
};
