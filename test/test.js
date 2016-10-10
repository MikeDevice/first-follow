'use strict';

var Grammar = require('../index').Grammar,
	_ = require('underscore'),
	grammarFixtures = require('./fixtures').grammars,
	helpers = require('./helpers');

describe('First set', function() {
	_(grammarFixtures).each(function(grammarFixture, index) {
		it('Test grammar #' + (index + 1), function() {
			var grammar = new Grammar(grammarFixture.rules);

			helpers.checkSetHash(grammar.getFirstSetHash(), grammarFixture.firstSetHash);
		});
	});
});

describe('Follow set', function() {
	_(grammarFixtures).each(function(grammarFixture, index) {
		it('Test grammar #' + (index + 1), function() {
			var grammar = new Grammar(grammarFixture.rules);

			helpers.checkSetHash(grammar.getFollowSetHash(),
				grammarFixture.followSetHash);
		});
	});
});

describe('Predict set', function() {
	_(grammarFixtures).each(function(grammarFixture, index) {
		it('Test grammar #' + (index + 1), function() {
			var grammar = new Grammar(grammarFixture.rules);

			helpers.checkPredictSets(grammar.getPredictSets(),
				grammarFixture.predictSets);
		});
	});
});
