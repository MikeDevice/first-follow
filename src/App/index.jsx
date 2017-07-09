import React, { Component } from 'react';
import Header from './Header';

import './fonts.scss';
import './normalize.scss';
import './page.scss';

export default class App extends Component {
  render() {
    return (
      <div className="page">
        <Header />
      </div>
    );
  }
}
