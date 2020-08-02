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
};
