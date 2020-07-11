# first-follow

[![GitHub release](https://img.shields.io/github/release/MikeDevice/first-follow.svg)](https://github.com/MikeDevice/first-follow/releases)
[![Build Status](https://travis-ci.org/MikeDevice/first-follow.svg?branch=master)](https://travis-ci.org/MikeDevice/first-follow)
[![Coverage Status](https://coveralls.io/repos/github/MikeDevice/first-follow/badge.svg?branch=master)](https://coveralls.io/github/MikeDevice/first-follow?branch=master)

A small tool for calculating first, follow and predict sets for the grammar. Its size is only 390 bytes (minified and gzipped). No dependencies. [Size Limit](https://github.com/ai/size-limit) controls the size.


## Installation
```
$ npm install first-follow
```

## Demo
You can try this tool [here](https://mikedevice.github.io/first-follow/).

## Example
```js
const firstFollow = require('first-follow');

const rules = [
  // S -> a b A
  {
    left: 'S',
    right: ['a', 'b', 'A']
  },

  // A -> b c
  {
    left: 'A',
    right: ['b', 'c']
  },

  // A -> ε
  {
    left: 'A',
    right: [null]
  }
];

const { firstSets, followSets, predictSets } = firstFollow(rules);

console.log(firstSets);
/*
 *  // S: a
 *  // A: b, ε
 *
 *  {
 *    S: ['a'],
 *    A: ['b', null]
 *  }
 */


console.log(followSets);
/*
 *  // S: ┤
 *  // A: ┤
 *
 *  {
 *    S: ['\u0000'],
 *    A: ['\u0000']
 *  }
 */

console.log(predictSets);
/*
 *  // 1: a
 *  // 2: b
 *  // 3: ┤
 * 
 *  {
 *    '1': ['a'],
 *    '2': ['b'],
 *    '3': ['\u0000']
 *  }
*/
```

## Rules

### Input
The grammar is represented by array of objects. Each object describes the only one rule. The rule's object contains two required fields:

* `left` — specifies the left part of the rule. A single nonterminal: `A`, `B`, `Program`, `Expression`, etc.
* `right` — specifies the right part of the rule. It contains terminals and nonterminals or empty chain (epsilon): `A + B`, `d * A`, `ε`, etc.

### Output
* The `firstSets` object's **keys** are *nonterminals* and **values** are first sets for these *nonterminals*.
* The `followSets` object's **keys** are *nonterminals* and **values** are follow sets for these *nonterminals*.
* The `predictSets` object's **keys** are  *rules numbers (starting from `1`)* and **values** are predict sets for these *rules*.

### Definitions
* An empty chain (`ε`) is represented by `null`.
* An end mark (`┤`) is represented by `\u0000`.
