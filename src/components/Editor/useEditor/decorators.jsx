import React from 'react';
import {chars, regexesContent} from './constants';
import {findWithRegex} from './helpers';

function makeStrategy(regex) {
  return (contentBlock, callback) => {
    findWithRegex(regex, contentBlock.getText(), callback);
  };
}

function makeNonterminalsStrategy(nonterminals) {
  return (contentBlock, callback) => {
    if (!nonterminals.length) return;

    // It's necessary to sort `nonterminals` by `length` to get correct matches
    // with strings included to other strings.
    //
    // Input: AB
    // Regex: (A|AB)
    // Result: A
    //
    // Input: AB
    // Regex: (AB|A)
    // Result: AB
    const sortedNonterminals = [...nonterminals].sort((a, b) => b.length - a.length);
    const regex = new RegExp(sortedNonterminals.join('|'), 'g');

    findWithRegex(regex, contentBlock.getText(), (start, end, {input}) => {
      // index before nonterminal.
      const prevIndex = start - 1;
      // index after nonterminal
      const nextIndex = end;

      const checkRegex = new RegExp(`${chars.arrow}|\\s`);
      const leftCheck = !start || checkRegex.test(input[prevIndex]);
      const rightCheck = end > input.length - 1 || checkRegex.test(input[nextIndex]);

      if (leftCheck && rightCheck) {
        callback(start, end);
      }
    });
  };
}

export const makeComponent = (className) => ({children}) => (
  <span className={className}>
    {children}
  </span>
);

export default {
  arrow: {
    strategy: makeStrategy(new RegExp(chars.arrow, 'g')),
    component: makeComponent('editor-content-arrow'),
  },
  arrowPlaceholder: {
    strategy: makeStrategy(new RegExp(`^${regexesContent.startOfRule}$`, 'ig')),
    component: makeComponent('editor-content-arrow-placeholder'),
  },
  emptyChainPlaceholder: {
    strategy: makeStrategy(new RegExp(`${chars.arrow}\\s*$`, 'ig')),
    component: makeComponent('editor-content-empty-chain-placeholder'),
  },
  nonterminal: (nonterminals = []) => ({
    strategy: makeNonterminalsStrategy(nonterminals),
    component: makeComponent('editor-content-nonterminal'),
  }),
};
