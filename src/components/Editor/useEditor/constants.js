export const chars = {
  arrow: '\u27f6',
  emptyChain: '\u03b5',
};

const nonterminal = '[A-Za-z_]\\w*';

export const regexesContent = {
  startOfRule: `\\s*${nonterminal}`,
  nonterminal,
};
