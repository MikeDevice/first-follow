'use strict';

var _ = require('underscore');

var prepareSet = function(set) {
	return _(set).map(function(item) {
		if (item === '\0') return '-|';
		if (item === null) return 'ε';

		return item;
	});
};

exports.prepareSetHashToOutput = function(setHash) {
	return _(setHash).mapObject(prepareSet);
};
