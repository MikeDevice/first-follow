import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable import/no-extraneous-dependencies */
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
/* eslint-enable import/no-extraneous-dependencies */

import App from './App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
