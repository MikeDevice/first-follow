# first-follow
Calculator for finding first, follow and predict sets by the grammar.

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

console.log(grammar.getFirstSetHash());
console.log(grammar.getFollowSetHash());
console.log(grammar.getPredictSets());
```

## Input
Grammar is represented as array of objects. Each object describes one rule. Rule contains two required fields:
  * `left` — specifies the nonterminal of left part of rule.
  * `right` — specifies the right part of rule, that contains terminals and nonterminals or empty chain (epsilon).

## Output
First and follow sets are represented as array of objects. Keys are nonterminals and values are sets (first or follow) for these nonterminals.

Predict sets are represented as array of objects. Keys are rule's number and values are sets. Each set may contain terminals and end mark (`\u0000`)

## Output examples
**First set**
```
{
  S: ['a'],
  A: ['b', null]
}
```

**Follow set**
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
