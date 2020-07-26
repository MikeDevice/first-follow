import React from 'react';
import {hot} from 'react-hot-loader/root';
import {Editor, Header, Section, Table} from '../components';
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
        <Section className="main__section">
          <Editor />
        </Section>
        <Section
          title="First sets"
          className="main__section"
        >
          <Table
            data={firstSets}
            columns={['begin', 'end', 'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i']}
          />
        </Section>
        <Section
          title="Follow sets"
          className="main__section"
        >
          <Table
            data={firstSets}
            columns={['begin', 'end', 'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i']}
          />
        </Section>
        <Section
          title="Predict sets"
          className="main__section"
        >
          <Table
            data={firstSets}
            columns={['begin', 'end', 'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i']}
          />
        </Section>
      </main>
    </div>
  );
}

export default hot(App);
