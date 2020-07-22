import React from 'react';
import {hot} from 'react-hot-loader/root';
import {Header, Table} from '../components';
import './app.scss';
import './main.scss';

const firstSets = {
  S: ['var'],
  A: ['begin', 'end', 'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i'],
  B: ['begin', 'end'],
};

function App() {
  return (
    <div className="app">
      <Header
        title="First Follow"
        description="A small tool for calculating first, follow and predict sets for the grammar"
        className="app__header"
      />
      <main className="app__main main">
        <section className="main__section">Editor</section>
        <section className="main__section">
          <h2>First sets</h2>
          <div className="main__table">
            <Table
              data={firstSets}
              columns={['begin', 'end', 'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i']}
            />
          </div>
        </section>
        <section className="main__section">
          <h2>Follow sets</h2>
          <div className="main__table">
            <Table
              data={firstSets}
              columns={['begin', 'end', 'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i']}
            />
          </div>
        </section>
        <section className="main__section">
          <h2>Predict sets</h2>
          <div className="main__table">
            <Table
              data={firstSets}
              columns={['begin', 'end', 'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i']}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default hot(App);
