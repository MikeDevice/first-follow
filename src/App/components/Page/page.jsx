import React, { Component } from 'react';

import Form from '../Form';
import Header from '../Header';
import Section from '../Section';
import ErrorLabel from '../ErrorLabel';

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

  render() {
    const { errorsLineNumbers } = this.state;

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
        </main>
      </div>
    );
  }
}

export default Page;
