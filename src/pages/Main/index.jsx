import React, {useState, useRef} from 'react';
import firstFollow from 'first-follow';
import {Layout, Editor, Section, GrammarSetTable} from '../../components';
import {getTerminals} from '../../helpers/grammar';
import './main.scss';

const defaultContent = [
  'Program⟶var Variables begin Operators end',
  'Variables⟶Variable ; Variables',
  'Variables⟶',
  'Variable⟶identifier',
  'Operators⟶Operator ; Operators',
  'Operators⟶',
  'Operator⟶read ( Variable )',
  'Operator⟶write ( Variable )',
].join('\n');

const labelText = 'The grammar has been changed. The results are no longer relevant.';

function Main() {
  const [grammar, setGrammar] = useState(null);
  const [isResultSynced, setIsResultSynced] = useState(true);
  const submittedContentRef = useRef();
  const {firstSets, followSets, predictSets} = grammar ? firstFollow(grammar) : {};
  const terminals = grammar ? getTerminals(grammar) : [];
  const label = isResultSynced ? null : labelText;

  const onEditorChange = (content) => {
    if (!submittedContentRef.current) return;

    const isSynced = content.trim() === submittedContentRef.current.trim();
    setIsResultSynced(isSynced);
  };

  const onEditorSubmit = (editorGrammar, content) => {
    submittedContentRef.current = content;

    setGrammar(editorGrammar);
    setIsResultSynced(true);
  };

  return (
    <Layout>
      <div className="main">
        <Section className="main__section">
          <Editor
            defaultContent={defaultContent}
            onChange={onEditorChange}
            onSubmit={onEditorSubmit}
          />
        </Section>
        {firstSets && (
          <Section title="First sets" label={label} className="main__section">
            <GrammarSetTable
              data={firstSets}
              columns={terminals}
              withEmptyChain
            />
          </Section>
        )}
        {followSets && (
          <Section title="Follow sets" label={label} className="main__section">
            <GrammarSetTable
              data={followSets}
              columns={terminals}
              withEndMark
            />
          </Section>
        )}
        {predictSets && (
          <Section title="Predict sets" label={label} className="main__section">
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
