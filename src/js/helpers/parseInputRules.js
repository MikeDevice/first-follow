'use strict';

module.exports = function(rules) {
	var data = [];

	rules.forEach(function(rule) {
		rule = rule.trim();

		var match = rule.match(/^(\w)\s*->\s*(\w+)$/);

		if (match && match[1] && match[2]) {
			data.push({
				left: match[1],
				right: match[2].split('')
			});
		} else {
			throw new Error();
		}
	});

	return data;
};
