import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ContentEditor from './ContentEditor';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import RowsNumbers from './RowsNumbers';
import useEditor from './useEditor';
import './editor.scss';

const defaultContent = [
  '',
].join('\n');

function getRowsNumbers(rows) {
  const numbers = [];
  let counter = 1;

  rows.forEach((line) => {
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

function parseRows(rows) {
  return rows
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
  const {state, onChange, undo, redo, clear, getContentRows} = useEditor(defaultContent);
  const rows = getContentRows();
  const rowsNumbers = getRowsNumbers(rows);
  const parsedRows = parseRows(rows);
  const errors = getErrors(parsedRows);

  const onRunClick = () => {
    if (errors.length || !parsedRows.length) return;

    onSubmit(parsedRows);
  };

  return (
    <div className="editor">
      <Toolbar onUndoClick={undo} onRedoClick={redo} onClearClick={clear} />
      <div className="editor__content">
        <div className="editor__rows-numbers">
          <RowsNumbers numbers={rowsNumbers} errors={errors} />
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
