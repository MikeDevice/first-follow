import React from 'react';
import {chars, regexesContent} from './constants';
import {findWithRegex} from './helpers';

export const makeStrategy = (regex) => (contentBlock, callback) => {
  findWithRegex(regex, contentBlock.getText(), callback);
};

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
};
