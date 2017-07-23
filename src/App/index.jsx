import React, { Component } from 'react';

import Header from './components/Header';
import Form from './components/Form';

import './styles/index.scss';

export default class App extends Component {
  render() {
    return (
      <div className="page">
        <div className="page__header">
          <Header />
        </div>

        <main className="page__main">
          <section className="section">
            <h2 className="section__header">Grammar</h2>
            <Form />
          </section>
        </main>
      </div>
    );
  }
}
