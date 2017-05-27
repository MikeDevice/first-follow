'use strict';

var Grammar = require('first-follow').Grammar,
	helpers = require('./helpers');

var input = document.getElementsByClassName('js-input')[0],
	rules = input.innerText.trim().split('\n'),
	data = helpers.parseInputRules(rules),
	grammar = new Grammar(data);

console.log(data);
console.log(grammar.getFirstSetHash());
console.log(grammar.getFollowSetHash());
console.log(grammar.getPredictSets());
