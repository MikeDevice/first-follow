import React from 'react';

import Form from '../../page-components/Form';
import Header from '../../page-components/Header';
import Section from '../../page-components/Section';

function Page() {
  return (
    <div className="page">
      <div className="page__header">
        <Header />
      </div>
      <div className="page__body">
        <Section title="Grammar">
          <Form />
        </Section>
      </div>
    </div>
  );
}

export default Page;
