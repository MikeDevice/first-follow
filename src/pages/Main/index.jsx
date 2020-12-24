import React, {useState, useRef} from 'react';
import firstFollow from 'first-follow';
import {Layout, Editor, Switcher, SetsView} from '../../components';
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

function Main() {
  const [grammar, setGrammar] = useState(null);
  const [isResultSynced, setIsResultSynced] = useState(true);
  const submittedContentRef = useRef();
  const {firstSets, followSets, predictSets} = grammar ? firstFollow(grammar) : {};

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

  const setsViewProps = {
    withEmptyColumns: true,
    isSynced: isResultSynced,
    grammar,
  };

  return (
    <Layout>
      <div className="main">
        {/* <Switcher isChecked /> */}
        <div className="main__section">
          <Editor
            defaultContent={defaultContent}
            onChange={onEditorChange}
            onSubmit={onEditorSubmit}
          />
        </div>
        {firstSets && (
          <div className="main__section">
            <SetsView
              title="First sets"
              sets={firstSets}
              withEmptyChain
              {...setsViewProps}
            />
          </div>
        )}
        {followSets && (
          <div className="main__section">
            <SetsView
              title="Follow sets"
              sets={followSets}
              withEndMark
              {...setsViewProps}
            />
          </div>
        )}
        {predictSets && (
          <div className="main__section">
            <SetsView
              title="Predict sets"
              sets={predictSets}
              withEndMark
              {...setsViewProps}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Main;
