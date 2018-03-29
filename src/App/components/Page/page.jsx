import React, { Component } from 'react';

import Form from '../Form';
import Header from '../Header';
import Section from '../Section';

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
          <Section title="Grammar">
            <Form onSubmit={this.onFormSubmit} />
          </Section>
          {Boolean(errorsLineNumbers.length) && errorsLineNumbers.join(', ')}
        </main>
      </div>
    );
  }
}

export default Page;
