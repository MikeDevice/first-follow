'use strict';

exports.grammars = [{
	rules: [
		{
			left: 'S',
			right: ['a']
		}
	],
	firstSetHash: {
		S: ['a']
	},
	followSetHash: {
		S: ['\0']
	},
	predictSets: [
		['a']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A']
		},
		{
			left: 'A',
			right: ['a']
		}
	],
	firstSetHash: {
		S: ['a'],
		A: ['a']
	},
	followSetHash: {
		S: ['\0'],
		A: ['\0']
	},
	predictSets: [
		['a'],
		['a']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A']
		},
		{
			left: 'S',
			right: [null]
		},
		{
			left: 'A',
			right: ['a']
		}
	],
	firstSetHash: {
		S: ['a', null],
		A: ['a']
	},
	followSetHash: {
		S: ['\0'],
		A: ['\0']
	},
	predictSets: [
		['a'],
		['\0'],
		['a']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A']
		},
		{
			left: 'S',
			right: [null]
		},
		{
			left: 'A',
			right: ['a']
		},
		{
			left: 'A',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', null],
		A: ['a', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['\0']
	},
	predictSets: [
		['a', '\0'],
		['\0'],
		['a'],
		['\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'b']
		},
		{
			left: 'S',
			right: [null]
		},
		{
			left: 'A',
			right: ['a']
		},
		{
			left: 'A',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', null, 'b'],
		A: ['a', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b']
	},
	predictSets: [
		['a', 'b'],
		['\0'],
		['a'],
		['b']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'B', 'c']
		},
		{
			left: 'S',
			right: [null]
		},
		{
			left: 'A',
			right: ['a']
		},
		{
			left: 'A',
			right: [null]
		},
		{
			left: 'B',
			right: ['b']
		},
		{
			left: 'B',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', null, 'b', 'c'],
		A: ['a', null],
		B: ['b', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b', 'c'],
		B: ['c']
	},
	predictSets: [
		['a', 'b', 'c'],
		['\0'],
		['a'],
		['b', 'c'],
		['b'],
		['c']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'B']
		},
		{
			left: 'S',
			right: [null]
		},
		{
			left: 'A',
			right: ['a']
		},
		{
			left: 'A',
			right: [null]
		},
		{
			left: 'B',
			right: ['b']
		},
		{
			left: 'B',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', null, 'b'],
		A: ['a', null],
		B: ['b', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b', '\0'],
		B: ['\0']
	},
	predictSets: [
		['a', 'b', '\0'],
		['\0'],
		['a'],
		['b', '\0'],
		['b'],
		['\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'B']
		},
		{
			left: 'S',
			right: ['B', 'c']
		},
		{
			left: 'A',
			right: ['a']
		},
		{
			left: 'A',
			right: [null]
		},
		{
			left: 'B',
			right: ['b']
		},
		{
			left: 'B',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', null, 'b', 'c'],
		A: ['a', null],
		B: ['b', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b', '\0'],
		B: ['c', '\0']
	},
	predictSets: [
		['a', 'b', '\0'],
		['b', 'c'],
		['a'],
		['b', '\0'],
		['b'],
		['c', '\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'B']
		},
		{
			left: 'S',
			right: ['B', 'c']
		},
		{
			left: 'A',
			right: ['B', 'a']
		},
		{
			left: 'A',
			right: ['B']
		},
		{
			left: 'A',
			right: [null]
		},
		{
			left: 'B',
			right: ['b']
		},
		{
			left: 'B',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', null, 'b', 'c'],
		A: ['a', 'b', null],
		B: ['b', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b', '\0'],
		B: ['a', 'b', 'c', '\0']
	},
	predictSets: [
		['a', 'b', '\0'],
		['b', 'c'],
		['a', 'b'],
		['b', '\0'],
		['b', '\0'],
		['b'],
		['a', 'b', 'c', '\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'B']
		},
		{
			left: 'S',
			right: ['B', 'c']
		},
		{
			left: 'A',
			right: ['B', 'a']
		},
		{
			left: 'A',
			right: ['B']
		},
		{
			left: 'B',
			right: ['b']
		},
		{
			left: 'B',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', null, 'b', 'c'],
		A: ['a', 'b', null],
		B: ['b', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b', '\0'],
		B: ['a', 'b', 'c', '\0']
	},
	predictSets: [
		['a', 'b', '\0'],
		['b', 'c'],
		['a', 'b'],
		['b', '\0'],
		['b'],
		['a', 'b', 'c', '\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'B']
		},
		{
			left: 'S',
			right: ['B', 'c']
		},
		{
			left: 'A',
			right: ['B', 'a']
		},
		{
			left: 'B',
			right: ['b']
		},
		{
			left: 'B',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', 'b', 'c'],
		A: ['a', 'b'],
		B: ['b', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b', '\0'],
		B: ['a', 'c', '\0']
	},
	predictSets: [
		['a', 'b'],
		['b', 'c'],
		['a', 'b'],
		['b'],
		['a', 'c', '\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'b', 'C']
		},
		{
			left: 'S',
			right: ['B', 'C']
		},
		{
			left: 'S',
			right: ['C']
		},
		{
			left: 'A',
			right: ['a', 'b', 'C']
		},
		{
			left: 'A',
			right: ['B', 'C']
		},
		{
			left: 'A',
			right: [null]
		},
		{
			left: 'B',
			right: ['b', 'c']
		},
		{
			left: 'C',
			right: ['c']
		},
		{
			left: 'C',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', 'b', 'c', null],
		A: ['a', 'b', null],
		B: ['b'],
		C: ['c', null]
	},
	followSetHash: {
		S: ['\0'],
		A: ['b'],
		B: ['b', 'c', '\0'],
		C: ['b', '\0']
	},
	predictSets: [
		['a', 'b'],
		['b'],
		['c', '\0'],
		['a'],
		['b'],
		['b'],
		['b'],
		['c'],
		['b', '\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'b', 'C']
		},
		{
			left: 'S',
			right: ['B', 'C']
		},
		{
			left: 'S',
			right: ['C']
		},
		{
			left: 'A',
			right: ['a', 'b', 'S']
		},
		{
			left: 'A',
			right: ['S', 'B', 'C']
		},
		{
			left: 'A',
			right: [null]
		},
		{
			left: 'B',
			right: ['b', 'c', 'S']
		},
		{
			left: 'C',
			right: ['c', 'S']
		},
		{
			left: 'C',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', 'b', 'c', null],
		A: ['a', 'b', 'c', null],
		B: ['b'],
		C: ['c', null]
	},
	followSetHash: {
		S: ['b', 'c', '\0'],
		A: ['b'],
		B: ['b', 'c', '\0'],
		C: ['b', 'c', '\0']
	},
	predictSets: [
		['a', 'b', 'c'],
		['b'],
		['b', 'c', '\0'],
		['a'],
		['a', 'b', 'c'],
		['b'],
		['b'],
		['c'],
		['b', 'c', '\0']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['A', 'b', 'C']
		},
		{
			left: 'S',
			right: ['B', 'C']
		},
		{
			left: 'S',
			right: ['C']
		},
		{
			left: 'A',
			right: ['a', 'b', 'S']
		},
		{
			left: 'A',
			right: ['S', 'B', 'C']
		},
		{
			left: 'A',
			right: ['C', 'S']
		},
		{
			left: 'B',
			right: ['B', 'a', 'C']
		},
		{
			left: 'B',
			right: [null]
		},
		{
			left: 'C',
			right: ['c', 'S']
		},
		{
			left: 'C',
			right: [null]
		}
	],
	firstSetHash: {
		S: ['a', 'b', 'c', null],
		A: ['a', 'b', 'c', null],
		B: ['a', null],
		C: ['c', null]
	},
	followSetHash: {
		S: ['a', 'b', 'c', '\0'],
		A: ['b'],
		B: ['a', 'b', 'c', '\0'],
		C: ['a', 'b', 'c', '\0']
	},
	predictSets: [
		['a', 'b', 'c'],
		['a', 'b', 'c', '\0'],
		['a', 'b', 'c', '\0'],
		['a'],
		['a', 'b', 'c'],
		['a', 'b', 'c'],
		['a'],
		['a', 'b', 'c', '\0'],
		['c'],
		['a', 'b', 'c', '\0']
	]
}, {
	rules: [
		{
			left: 'E',
			right: ['T', 'E_']
		},
		{
			left: 'E_',
			right: ['+', 'T', 'E_']
		},
		{
			left: 'E_',
			right: [null]
		},
		{
			left: 'T',
			right: ['P', 'T_']
		},
		{
			left: 'T_',
			right: ['*', 'P', 'T_']
		},
		{
			left: 'T_',
			right: [null]
		},
		{
			left: 'P',
			right: ['(', 'E', ')']
		},
		{
			left: 'P',
			right: ['a']
		}
	],
	firstSetHash: {
		E_: ['+', null],
		T_: ['*', null],
		P: ['(', 'a'],
		T: ['(', 'a'],
		E: ['(', 'a']
	},
	followSetHash: {
		E_: ['\0', ')'],
		T_: ['\0', '+', ')'],
		P: ['\0', '+', ')', '*'],
		T: ['\0', '+', ')'],
		E: ['\0', ')']
	},
	predictSets: [
		['(', 'a'],
		['+'],
		['\0', ')'],
		['(', 'a'],
		['*'],
		['+', '\0', ')'],
		['('],
		['a']
	]
}, {
	rules: [
		{
			left: 'S',
			right: ['b', 'A', 'S', 'B']
		},
		{
			left: 'S',
			right: ['b', 'A']
		},
		{
			left: 'A',
			right: ['d', 'S', 'c', 'a']
		},
		{
			left: 'A',
			right: ['e']
		},
		{
			left: 'B',
			right: ['c', 'A', 'a']
		},
		{
			left: 'B',
			right: ['c']
		}
	],
	firstSetHash: {
		S: ['b'],
		A: ['d', 'e'],
		B: ['c']
	},
	followSetHash: {
		S: ['c', '\0'],
		A: ['a', 'b', 'c', '\0'],
		B: ['c', '\0']
	},
	predictSets: [
		['b'],
		['b'],
		['d'],
		['e'],
		['c'],
		['c']
	]
}];
