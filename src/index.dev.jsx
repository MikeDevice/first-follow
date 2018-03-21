/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import App from './App';

const HotApp = hot(module)(App);

render(
  <HotApp />,
  document.getElementById('root'),
);
