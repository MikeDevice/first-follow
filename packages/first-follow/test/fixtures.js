exports.grammars = [{
  rules: [
    {
      left: 'S',
      right: ['a'],
    },
  ],
  firstSets: {
    S: ['a'],
  },
  followSets: {
    S: ['\0'],
  },
  predictSets: {
    1: ['a'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A'],
    },
    {
      left: 'A',
      right: ['a'],
    },
  ],
  firstSets: {
    S: ['a'],
    A: ['a'],
  },
  followSets: {
    S: ['\0'],
    A: ['\0'],
  },
  predictSets: {
    1: ['a'],
    2: ['a'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A'],
    },
    {
      left: 'S',
      right: [null],
    },
    {
      left: 'A',
      right: ['a'],
    },
  ],
  firstSets: {
    S: ['a', null],
    A: ['a'],
  },
  followSets: {
    S: ['\0'],
    A: ['\0'],
  },
  predictSets: {
    1: ['a'],
    2: ['\0'],
    3: ['a'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A'],
    },
    {
      left: 'S',
      right: [null],
    },
    {
      left: 'A',
      right: ['a'],
    },
    {
      left: 'A',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', null],
    A: ['a', null],
  },
  followSets: {
    S: ['\0'],
    A: ['\0'],
  },
  predictSets: {
    1: ['a', '\0'],
    2: ['\0'],
    3: ['a'],
    4: ['\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'b'],
    },
    {
      left: 'S',
      right: [null],
    },
    {
      left: 'A',
      right: ['a'],
    },
    {
      left: 'A',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', null, 'b'],
    A: ['a', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b'],
  },
  predictSets: {
    1: ['a', 'b'],
    2: ['\0'],
    3: ['a'],
    4: ['b'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'B', 'c'],
    },
    {
      left: 'S',
      right: [null],
    },
    {
      left: 'A',
      right: ['a'],
    },
    {
      left: 'A',
      right: [null],
    },
    {
      left: 'B',
      right: ['b'],
    },
    {
      left: 'B',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', null, 'b', 'c'],
    A: ['a', null],
    B: ['b', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b', 'c'],
    B: ['c'],
  },
  predictSets: {
    1: ['a', 'b', 'c'],
    2: ['\0'],
    3: ['a'],
    4: ['b', 'c'],
    5: ['b'],
    6: ['c'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'B'],
    },
    {
      left: 'S',
      right: [null],
    },
    {
      left: 'A',
      right: ['a'],
    },
    {
      left: 'A',
      right: [null],
    },
    {
      left: 'B',
      right: ['b'],
    },
    {
      left: 'B',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', null, 'b'],
    A: ['a', null],
    B: ['b', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b', '\0'],
    B: ['\0'],
  },
  predictSets: {
    1: ['a', 'b', '\0'],
    2: ['\0'],
    3: ['a'],
    4: ['b', '\0'],
    5: ['b'],
    6: ['\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'B'],
    },
    {
      left: 'S',
      right: ['B', 'c'],
    },
    {
      left: 'A',
      right: ['a'],
    },
    {
      left: 'A',
      right: [null],
    },
    {
      left: 'B',
      right: ['b'],
    },
    {
      left: 'B',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', null, 'b', 'c'],
    A: ['a', null],
    B: ['b', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b', '\0'],
    B: ['c', '\0'],
  },
  predictSets: {
    1: ['a', 'b', '\0'],
    2: ['b', 'c'],
    3: ['a'],
    4: ['b', '\0'],
    5: ['b'],
    6: ['c', '\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'B'],
    },
    {
      left: 'S',
      right: ['B', 'c'],
    },
    {
      left: 'A',
      right: ['B', 'a'],
    },
    {
      left: 'A',
      right: ['B'],
    },
    {
      left: 'A',
      right: [null],
    },
    {
      left: 'B',
      right: ['b'],
    },
    {
      left: 'B',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', null, 'b', 'c'],
    A: ['a', 'b', null],
    B: ['b', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b', '\0'],
    B: ['a', 'b', 'c', '\0'],
  },
  predictSets: {
    1: ['a', 'b', '\0'],
    2: ['b', 'c'],
    3: ['a', 'b'],
    4: ['b', '\0'],
    5: ['b', '\0'],
    6: ['b'],
    7: ['a', 'b', 'c', '\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'B'],
    },
    {
      left: 'S',
      right: ['B', 'c'],
    },
    {
      left: 'A',
      right: ['B', 'a'],
    },
    {
      left: 'A',
      right: ['B'],
    },
    {
      left: 'B',
      right: ['b'],
    },
    {
      left: 'B',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', null, 'b', 'c'],
    A: ['a', 'b', null],
    B: ['b', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b', '\0'],
    B: ['a', 'b', 'c', '\0'],
  },
  predictSets: {
    1: ['a', 'b', '\0'],
    2: ['b', 'c'],
    3: ['a', 'b'],
    4: ['b', '\0'],
    5: ['b'],
    6: ['a', 'b', 'c', '\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'B'],
    },
    {
      left: 'S',
      right: ['B', 'c'],
    },
    {
      left: 'A',
      right: ['B', 'a'],
    },
    {
      left: 'B',
      right: ['b'],
    },
    {
      left: 'B',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', 'b', 'c'],
    A: ['a', 'b'],
    B: ['b', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b', '\0'],
    B: ['a', 'c', '\0'],
  },
  predictSets: {
    1: ['a', 'b'],
    2: ['b', 'c'],
    3: ['a', 'b'],
    4: ['b'],
    5: ['a', 'c', '\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'b', 'C'],
    },
    {
      left: 'S',
      right: ['B', 'C'],
    },
    {
      left: 'S',
      right: ['C'],
    },
    {
      left: 'A',
      right: ['a', 'b', 'C'],
    },
    {
      left: 'A',
      right: ['B', 'C'],
    },
    {
      left: 'A',
      right: [null],
    },
    {
      left: 'B',
      right: ['b', 'c'],
    },
    {
      left: 'C',
      right: ['c'],
    },
    {
      left: 'C',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', 'b', 'c', null],
    A: ['a', 'b', null],
    B: ['b'],
    C: ['c', null],
  },
  followSets: {
    S: ['\0'],
    A: ['b'],
    B: ['b', 'c', '\0'],
    C: ['b', '\0'],
  },
  predictSets: {
    1: ['a', 'b'],
    2: ['b'],
    3: ['c', '\0'],
    4: ['a'],
    5: ['b'],
    6: ['b'],
    7: ['b'],
    8: ['c'],
    9: ['b', '\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'b', 'C'],
    },
    {
      left: 'S',
      right: ['B', 'C'],
    },
    {
      left: 'S',
      right: ['C'],
    },
    {
      left: 'A',
      right: ['a', 'b', 'S'],
    },
    {
      left: 'A',
      right: ['S', 'B', 'C'],
    },
    {
      left: 'A',
      right: [null],
    },
    {
      left: 'B',
      right: ['b', 'c', 'S'],
    },
    {
      left: 'C',
      right: ['c', 'S'],
    },
    {
      left: 'C',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', 'b', 'c', null],
    A: ['a', 'b', 'c', null],
    B: ['b'],
    C: ['c', null],
  },
  followSets: {
    S: ['b', 'c', '\0'],
    A: ['b'],
    B: ['b', 'c', '\0'],
    C: ['b', 'c', '\0'],
  },
  predictSets: {
    1: ['a', 'b', 'c'],
    2: ['b'],
    3: ['b', 'c', '\0'],
    4: ['a'],
    5: ['a', 'b', 'c'],
    6: ['b'],
    7: ['b'],
    8: ['c'],
    9: ['b', 'c', '\0'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['A', 'b', 'C'],
    },
    {
      left: 'S',
      right: ['B', 'C'],
    },
    {
      left: 'S',
      right: ['C'],
    },
    {
      left: 'A',
      right: ['a', 'b', 'S'],
    },
    {
      left: 'A',
      right: ['S', 'B', 'C'],
    },
    {
      left: 'A',
      right: ['C', 'S'],
    },
    {
      left: 'B',
      right: ['B', 'a', 'C'],
    },
    {
      left: 'B',
      right: [null],
    },
    {
      left: 'C',
      right: ['c', 'S'],
    },
    {
      left: 'C',
      right: [null],
    },
  ],
  firstSets: {
    S: ['a', 'b', 'c', null],
    A: ['a', 'b', 'c', null],
    B: ['a', null],
    C: ['c', null],
  },
  followSets: {
    S: ['a', 'b', 'c', '\0'],
    A: ['b'],
    B: ['a', 'b', 'c', '\0'],
    C: ['a', 'b', 'c', '\0'],
  },
  predictSets: {
    1: ['a', 'b', 'c'],
    2: ['a', 'b', 'c', '\0'],
    3: ['a', 'b', 'c', '\0'],
    4: ['a'],
    5: ['a', 'b', 'c'],
    6: ['a', 'b', 'c'],
    7: ['a'],
    8: ['a', 'b', 'c', '\0'],
    9: ['c'],
    10: ['a', 'b', 'c', '\0'],
  },
}, {
  rules: [
    {
      left: 'E',
      right: ['T', 'E_'],
    },
    {
      left: 'E_',
      right: ['+', 'T', 'E_'],
    },
    {
      left: 'E_',
      right: [null],
    },
    {
      left: 'T',
      right: ['P', 'T_'],
    },
    {
      left: 'T_',
      right: ['*', 'P', 'T_'],
    },
    {
      left: 'T_',
      right: [null],
    },
    {
      left: 'P',
      right: ['(', 'E', ')'],
    },
    {
      left: 'P',
      right: ['a'],
    },
  ],
  firstSets: {
    E_: ['+', null],
    T_: ['*', null],
    P: ['(', 'a'],
    T: ['(', 'a'],
    E: ['(', 'a'],
  },
  followSets: {
    E_: ['\0', ')'],
    T_: ['\0', '+', ')'],
    P: ['\0', '+', ')', '*'],
    T: ['\0', '+', ')'],
    E: ['\0', ')'],
  },
  predictSets: {
    1: ['(', 'a'],
    2: ['+'],
    3: ['\0', ')'],
    4: ['(', 'a'],
    5: ['*'],
    6: ['+', '\0', ')'],
    7: ['('],
    8: ['a'],
  },
}, {
  rules: [
    {
      left: 'S',
      right: ['b', 'A', 'S', 'B'],
    },
    {
      left: 'S',
      right: ['b', 'A'],
    },
    {
      left: 'A',
      right: ['d', 'S', 'c', 'a'],
    },
    {
      left: 'A',
      right: ['e'],
    },
    {
      left: 'B',
      right: ['c', 'A', 'a'],
    },
    {
      left: 'B',
      right: ['c'],
    },
  ],
  firstSets: {
    S: ['b'],
    A: ['d', 'e'],
    B: ['c'],
  },
  followSets: {
    S: ['c', '\0'],
    A: ['a', 'b', 'c', '\0'],
    B: ['c', '\0'],
  },
  predictSets: {
    1: ['b'],
    2: ['b'],
    3: ['d'],
    4: ['e'],
    5: ['c'],
    6: ['c'],
  },
}];
