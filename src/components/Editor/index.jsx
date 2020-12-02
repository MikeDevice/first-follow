import _ from 'lodash-es';
import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ContentEditor from './ContentEditor';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import RowsNumbers from './RowsNumbers';
import useEditor from './useEditor';
import {parse} from '../../helpers/grammar';
import './editor.scss';

function Editor({defaultContent, onSubmit}) {
  const {state, onChange, undo, redo, clear, getContentRows} = useEditor(defaultContent);
  const [isSuccessLabelActive, setSuccessLabelActive] = useState(false);
  const timeoutId = useRef();
  const rows = getContentRows();
  const parsedRows = parse(rows);
  const errors = _.filter(parsedRows, 'error');

  const activateSuccessLabel = () => {
    clearTimeout(timeoutId.current);

    setSuccessLabelActive(true);

    timeoutId.current = setTimeout(() => {
      setSuccessLabelActive(false);
    }, 2000);
  };

  const onRunClick = () => {
    if (errors.length || !parsedRows.length) return;

    onSubmit(parsedRows);

    activateSuccessLabel();
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
        <StatusBar success={isSuccessLabelActive} errorsCount={errors.length} />
        <Button className="editor__button" onClick={onRunClick}>Run</Button>
      </div>
    </div>
  );
}

Editor.propTypes = {
  defaultContent: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  defaultContent: '',
};

export default Editor;
