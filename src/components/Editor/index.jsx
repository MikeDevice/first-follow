import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ContentEditor from './ContentEditor';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import LineNumbers from './LineNumbers';
import useEditor from './useEditor';
import './editor.scss';

const defaultContent = [
  '',
].join('\n');

function getLineNumbers(lines) {
  const numbers = [];
  let counter = 1;

  lines.forEach((line) => {
    if (line) {
      numbers.push(counter);
      counter += 1;
    } else {
      numbers.push(null);
    }
  });

  return numbers;
}

function parseLeftPart(str) {
  const result = str.trim().match(/^[A-Za-z_]\w*$/);

  return result && result[0];
}

function parseRightPart(str) {
  if (!_.isString(str)) return null;

  return str ? _.compact(str.split(/\s+/)) : [null];
}

function parseLine(line) {
  const [left, right] = line.split('\u27f6');

  return {
    left: parseLeftPart(left),
    right: parseRightPart(right),
  };
}

function parseLines(lines) {
  return lines
    .filter((line) => line.length)
    .map(parseLine);
}

function getErrors(data) {
  return data.reduce(
    (errors, {left, right}, index) => {
      const ruleNumber = index + 1;

      if (!left) {
        errors.push({
          type: 'INCORRECT_START_OF_RULE',
          ruleNumber,
        });
      } else if (!_.isArray(right)) {
        errors.push({
          type: 'RIGHT_PART_IS_ABSENT',
          ruleNumber,
        });
      }

      return errors;
    },
    [],
  );
}

function Editor({onSubmit}) {
  const {state, onChange, undo, redo, clear, getContentLines} = useEditor(defaultContent);
  const lines = getContentLines();
  const linesNumbers = getLineNumbers(lines);
  const parsedLines = parseLines(lines);
  const errors = getErrors(parsedLines);

  const onRunClick = () => {
    if (errors.length || !parsedLines.length) return;

    onSubmit(parsedLines);
  };

  return (
    <div className="editor">
      <Toolbar onUndoClick={undo} onRedoClick={redo} onClearClick={clear} />
      <div className="editor__content">
        <div className="editor__line-numbers">
          <LineNumbers numbers={linesNumbers} errors={errors} />
        </div>
        <div className="editor__body">
          <ContentEditor
            state={state}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="editor__footer">
        <StatusBar errorsCount={errors.length} />
        <Button className="editor__button" onClick={onRunClick}>Run</Button>
      </div>
    </div>
  );
}

Editor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Editor;
