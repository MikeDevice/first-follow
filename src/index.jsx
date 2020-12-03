import './global.scss';
import React from 'react';
import {render} from 'react-dom';
import {Main} from './pages';

let App = Main;

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const {hot} = require('react-hot-loader/root');

  App = hot(Main);
}

render(<App />, document.getElementById('root'));
