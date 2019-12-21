import React, { Component } from 'react';
import { Grammar } from 'first-follow';

import Form from '../Form';
import Table from '../Table';
import Header from '../Header';
import Section from '../Section';
import Terminal from '../Terminal';
import ErrorLabel from '../ErrorLabel';
import { epsilon, endMarker } from '../../constants';

class Page extends Component {
  state = {
    firstSets: null,
    followSets: null,
    predictSets: null,
    errorsLineNumbers: [],
  }

  onFormSubmit = (grammarData) => {
    const errorsLineNumbers = this.getErrorsLineNumbers(grammarData);

    this.setState({ errorsLineNumbers });

    if (errorsLineNumbers.length) {
      this.setState({
        firstSets: null,
        followSets: null,
        predictSets: null,
      });

      return;
    }

    const grammar = new Grammar(grammarData);

    this.setState({
      firstSets: grammar.getFirstSets(),
      followSets: grammar.getFollowSets(),
      predictSets: grammar.getPredictSets(),
    });
  }

  getErrorsLineNumbers = (grammarData) => {
    const errorsLineNumbers = [];

    grammarData.forEach((item, index) => {
      if (item) return;

      errorsLineNumbers.push(index + 1);
    });

    return errorsLineNumbers;
  }

  convertSetsToTableRows = (sets) => Object.entries(sets).map((row) => {
    const first = row[0];
    const last = row[1].map((item) => {
      switch (item) {
        case null:
          return epsilon;

        case '\0':
          return endMarker;

        default:
          return <Terminal>{item}</Terminal>;
      }
    });

    return [
      first,
      // eslint-disable-next-line react/no-array-index-key
      last.map((item, index) => <span key={index}>{item}</span>),
    ];
  });

  render() {
    const {
      firstSets, followSets, predictSets, errorsLineNumbers,
    } = this.state;

    return (
      <div className="page">
        <div className="page__header">
          <Header />
        </div>
        <main className="page__body">
          <div className="page__block">
            <Section title="Grammar">
              <Form onSubmit={this.onFormSubmit} />
            </Section>
          </div>
          {Boolean(errorsLineNumbers.length) && (
            <div className="page__block">
              <ErrorLabel errors={errorsLineNumbers} />
            </div>
          )}
          {firstSets && (
            <div className="page__block">
              <Table
                titles={['#', 'First sets']}
                rows={this.convertSetsToTableRows(firstSets)}
              />
            </div>
          )}
          {followSets && (
            <div className="page__block">
              <Table
                titles={['#', 'Follow sets']}
                rows={this.convertSetsToTableRows(followSets)}
              />
            </div>
          )}
          {predictSets && (
            <div className="page__block">
              <Table
                titles={['#', 'Predict sets']}
                rows={this.convertSetsToTableRows(predictSets)}
              />
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Page;
