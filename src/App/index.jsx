import React from 'react';
import {hot} from 'react-hot-loader/root';
import {Table} from '../components';
import './app.scss';

const firstSets = {
  S: ['var'],
  A: ['begin', 'end'],
  B: ['begin', 'end'],
};

function App() {
  return (
    <div className="app">
      <header>
        <h1>First Follow</h1>
        <p>A small tool for calculating first, follow and predict sets for the grammar</p>
      </header>
      <main>
        <section>Editor</section>
        <section>
          <h2>First sets</h2>
          <div className="app__table">
            <Table
              data={firstSets}
              columnsNames={['var', 'begin', 'end']}
            />
          </div>
        </section>
        <section>
          <h2>Follow sets</h2>
          {/* <Table /> */}
        </section>
        <section>
          <h2>Predict sets</h2>
          {/* <Table /> */}
        </section>
      </main>
    </div>
  );
}

export default hot(App);
