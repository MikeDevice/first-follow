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
  const [isSuccessLabelActive, setSuccessLabelActive] = useState(false);
  const timeoutId = useRef();

  const hideSuccessLabel = () => {
    clearTimeout(timeoutId.current);
    setSuccessLabelActive(false);
  };

  const showSuccessLabel = () => {
    hideSuccessLabel();
    setSuccessLabelActive(true);

    timeoutId.current = setTimeout(hideSuccessLabel, 2000);
  };

  const {state, onChange, undo, redo, clear, getContentRows} = useEditor({
    content: defaultContent,
    onContentChange: hideSuccessLabel,
  });

  const rows = getContentRows();
  const parsedRows = parse(rows);
  const errors = _.filter(parsedRows, 'error');

  const onRunClick = () => {
    onSubmit(parsedRows);
    showSuccessLabel();
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
        <Button
          className="editor__button"
          onClick={onRunClick}
          disabled={errors.length || !parsedRows.length}
        >
          Run
        </Button>
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
