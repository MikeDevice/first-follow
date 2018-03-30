import React, { Component } from 'react';

import Form from '../Form';
import Table from '../Table';
import Header from '../Header';
import Section from '../Section';
import ErrorLabel from '../ErrorLabel';
import { epsilon } from '../../constants';

class Page extends Component {
  state = {
    errorsLineNumbers: [],
  }

  onFormSubmit = (textArray) => {
    const errorsLineNumbers = [];

    textArray.forEach((item, index) => {
      if (item) return;

      errorsLineNumbers.push(index + 1);
    });

    this.setState({ errorsLineNumbers });
  }

  convertSetsToTableRows = sets =>
    Object.entries(sets).map((row) => {
      const first = row[0];
      const last = row[1].map((item) => {
        switch (item) {
          case null:
            return epsilon;

          case '\0':
            return '┤';

          default:
            return item;
        }
      });

      return [
        first,
        last.join(', '),
      ];
    });

  render() {
    const { errorsLineNumbers } = this.state;

    const sets = {
      S: ['a'],
      A: ['b', '\u0000', null],
    };

    return (
      <div className="page">
        <div className="page__header">
          <Header />
        </div>
        <main className="page__body">
          <div className="page__block page__block_narrow">
            <Section title="Grammar">
              <Form onSubmit={this.onFormSubmit} />
            </Section>
          </div>
          {Boolean(errorsLineNumbers.length) && (
            <div className="page__block page__block_narrow">
              <ErrorLabel errors={errorsLineNumbers} />
            </div>
          )}
          <div className="page__block">
            <Table
              titles={['#', 'Sets']}
              rows={this.convertSetsToTableRows(sets)}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default Page;
