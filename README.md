# first-follow

[![Build Status](https://travis-ci.org/MikeDevice/first-follow.svg?branch=master)](https://travis-ci.org/MikeDevice/first-follow)
[![GitHub release](https://img.shields.io/github/release/MikeDevice/first-follow.svg)](https://github.com/MikeDevice/first-follow/releases)

Calculator for finding first, follow and predict sets for a grammar.


## Installation
```
$ npm install first-follow
```

## Examples
```javascript
var Grammar = require('first-follow').Grammar;

// S -> abA
// A -> bc
// A -> ε
var grammar = new Grammar([
  {
    left: 'S',
    right: ['a', 'b', 'A']
  },
  {
    left: 'A',
    right: ['b', 'c']
  },
  {
    left: 'A',
    right: [null]
  }
]);

console.log(grammar.getFirstSets());
console.log(grammar.getFollowSets());
console.log(grammar.getPredictSets());
```

## Input
Grammar is represented as array of objects. Each object describes one rule. Rule contains two required fields:
  * `left` — specifies the nonterminal of left part of rule.
  * `right` — specifies the right part of rule, that contains terminals and nonterminals or empty chain (epsilon).

## Output
First and follow sets are represented as objects. Keys are nonterminals and values are sets (first or follow) for these nonterminals.

Predict sets are represented as object. Keys are rules' numbers and values are sets. Each set can contain terminals and end mark (`\u0000`)

## Output examples
**First sets**
```
{
  S: ['a'],
  A: ['b', null]
}
```

**Follow sets**
```
{
  S: ['\u0000'],
  A: ['\u0000']
}
```

**Predict sets**
```
{
  1: ['a'],       // first rule
  2: ['b'],       // second rule
  3: ['\u0000']   // third rule
}
```

## License
  MIT
