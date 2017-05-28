'use strict';

var Grammar = require('first-follow').Grammar,
	helpers = require('./helpers');

var input = document.getElementsByClassName('js-input')[0],
	button = document.getElementsByClassName('js-button')[0];

button.addEventListener('click', function() {
	var rules = input.value.trim().split('\n'),
		data = helpers.parseInputRules(rules);

	if (data.length) {
		var grammar = new Grammar(data),
			firstSetHash = helpers.prepareSetHashToOutput(grammar.getFirstSetHash()),
			followSetHash = helpers.prepareSetHashToOutput(grammar.getFollowSetHash()),
			predictSets = helpers.prepareSetHashToOutput(grammar.getPredictSets());
	}
});
