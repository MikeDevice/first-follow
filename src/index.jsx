import './global.scss';
import 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import {Main} from './pages';

let App = Main;

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const {hot} = require('react-hot-loader/root');

  App = hot(Main);
}

render(<App />, document.getElementById('root'));
