import React, {useState} from 'react';
import firstFollow from 'first-follow';
import {Layout, Editor, Section, GrammarSetTable} from '../../components';
import {getTerminals} from '../../helpers/grammar';
import './main.scss';

function Main() {
  const [grammar, setGrammar] = useState(null);
  const {firstSets, followSets, predictSets} = grammar ? firstFollow(grammar) : {};
  const terminals = grammar ? getTerminals(grammar) : [];

  const onEditorSubmit = (editorGrammar) => {
    setGrammar(editorGrammar);
  };

  return (
    <Layout>
      <div className="main">
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
      </div>
    </Layout>
  );
}

export default Main;
