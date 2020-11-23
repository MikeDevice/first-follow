import React, {useState} from 'react';
import firstFollow from 'first-follow';
import {Editor, Header, Section, GrammarSetTable} from '../components';
import {getTerminals} from '../helpers/grammar';
import './app.scss';
import './main.scss';

function App() {
  const [grammar, setGrammar] = useState(null);
  const {firstSets, followSets, predictSets} = grammar ? firstFollow(grammar) : {};
  const terminals = grammar ? getTerminals(grammar) : [];

  const onEditorSubmit = (editorGrammar) => {
    setGrammar(editorGrammar);
  };

  return (
    <div className="app">
      <Header
        title="First Follow"
        description="A small tool for calculating first, follow and predict sets for the grammar"
        className="app__header"
        link="https://github.com/MikeDevice/first-follow"
        linkText="GitHub"
      />
      <main className="app__main main">
        <Section className="main__section">
          <Editor onSubmit={onEditorSubmit} />
        </Section>
        {firstSets && (
          <Section title="First sets" className="main__section">
            <GrammarSetTable
              data={firstSets}
              columns={terminals}
              withEmptyChain
            />
          </Section>
        )}
        {followSets && (
          <Section title="Follow sets" className="main__section">
            <GrammarSetTable
              data={followSets}
              columns={terminals}
              withEndMark
            />
          </Section>
        )}
        {predictSets && (
          <Section title="Predict sets" className="main__section">
            <GrammarSetTable
              data={predictSets}
              columns={terminals}
              withEndMark
            />
          </Section>
        )}
      </main>
    </div>
  );
}

export default App;
