import './global.scss';
import 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import App from './App';

let AppWrapper = App;

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const {hot} = require('react-hot-loader/root');

  AppWrapper = hot(App);
}

render(<AppWrapper />, document.getElementById('root'));
