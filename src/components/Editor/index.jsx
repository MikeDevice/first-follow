import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ContentEditor from './ContentEditor';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import RowsNumbers from './RowsNumbers';
import useEditor from './useEditor';
import {parse} from '../../helpers/grammar';
import './editor.scss';

const defaultContent = [
  'S⟶a b A',
  'A⟶b c',
  'A⟶',
].join('\n');

function Editor({onSubmit}) {
  const {state, onChange, undo, redo, clear, getContentRows} = useEditor(defaultContent);
  const rows = getContentRows();
  const parsedRows = parse(rows);
  const errors = _.filter(parsedRows, 'error');

  const onRunClick = () => {
    if (errors.length || !parsedRows.length) return;

    onSubmit(parsedRows);
  };

  return (
    <div className="editor">
      <Toolbar onUndoClick={undo} onRedoClick={redo} onClearClick={clear} />
      <div className="editor__content">
        <div className="editor__rows-numbers">
          <RowsNumbers rows={rows} errors={errors} />
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
