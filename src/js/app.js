'use strict';

var _ = require('underscore'),
	Grammar = require('first-follow').Grammar,
	helpers = require('./helpers');

var input = document.getElementsByClassName('js-input')[0],
	button = document.getElementsByClassName('js-button')[0],
	errorElement = document.getElementById('error');

function showSections() {
	var centerSection = document.getElementsByClassName('section_center')[0];

	if (centerSection) {
		centerSection.classList.remove('section_center');
	}

	_(document.querySelectorAll('.section_hidden')).each(function(section) {
		section.classList.remove('section_hidden');
	});
}

function showError(err) {
	errorElement.innerText = err.message;
	errorElement.classList.remove('error_hidden');
}

function hideError() {
	errorElement.classList.add('error_hidden');
}

function calculateSets() {
	var rules = input.value.trim().split('\n'),
		data;

	try {
		data = helpers.parseInputRules(rules);
	} catch (err) {
		if (err.name === 'SyntaxError') {
			return showError(err);
		} else {
			throw err;
		}
	}

	hideError();

	if (data.length) {
		var grammar = new Grammar(data);

		return {
			firstSetHash: helpers.prepareSetHashToOutput(grammar.getFirstSetHash()),
			followSetHash: helpers.prepareSetHashToOutput(grammar.getFollowSetHash()),
			predictSets: helpers.prepareSetHashToOutput(grammar.getPredictSets())
		};
	}
}

button.addEventListener('click', function() {
	var sets = calculateSets();

	if (sets) {
		helpers.moveDataToTable(
			document.getElementById('first-sets-table'),
			sets.firstSetHash
		);

		helpers.moveDataToTable(
			document.getElementById('follow-sets-table'),
			sets.followSetHash
		);

		helpers.moveDataToTable(
			document.getElementById('predict-sets-table'),
			sets.predictSets
		);

		showSections();
	}
});
