import React, { Component } from 'react';

import Form from '../../page-components/Form';
import Header from '../../page-components/Header';
import Section from '../../page-components/Section';

class Page extends Component {
  state = {}

  onFormSubmit = (textArray) => {
    const errors = textArray.filter(item => !item);

    if (errors.length) {
      throw new Error('123123');
    }

    console.log(textArray);
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <Header />
        </div>
        <main className="page__body">
          <Section title="Grammar">
            <Form onSubmit={this.onFormSubmit} />
          </Section>
        </main>
      </div>
    );
  }
}

export default Page;
