export const chars = {
  arrow: '\u27f6',
};

const nonterminal = '\\w+';

export const regexesContent = {
  startOfRule: `\\s*${nonterminal}`,
  nonterminal,
};
