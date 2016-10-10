'use strict';

var _ = require('underscore'),
	expect = require('expect.js');

exports.checkSetHash = function(expectedSetHash, setHash) {
	var expectedKeys = _(expectedSetHash).chain()
		.keys()
		.sort()
		.value();

	var keys = _(setHash).chain()
		.keys()
		.sort()
		.value();

	expect(expectedKeys).to.eql(keys);

	_(expectedSetHash).each(function(right, left) {
		expect(_(right).sort()).to.eql(_(setHash[left]).sort());
	});
};

exports.checkPredictSets = function(expectedPredictSets, predictSets) {
	expect(expectedPredictSets.length).to.equal(predictSets.length);

	_(expectedPredictSets).each(function(expectedSets, index) {
		expect(_(expectedSets).sort()).to.eql(_(predictSets[index]).sort());
	});
};
