import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import {getTerminals} from '../../helpers/grammar';
import './sets-view.scss';

const labelText = 'The grammar has been changed. The results are no longer relevant.';

function SetsView({title, isSynced, grammar, sets, ...props}) {
  const terminals = getTerminals(grammar);

  return (
    <div className="sets-view">
      <div className="sets-view__header">
        <h2 className="sets-view__title">{title}</h2>
        {!isSynced && <p className="sets-view__label">{labelText}</p>}
      </div>
      <div className="sets-view__table">
        <Table
          data={sets}
          columns={terminals}
          {...props}
        />
      </div>
    </div>
  );
}

SetsView.propTypes = {
  title: PropTypes.string.isRequired,
  grammar: PropTypes.arrayOf(PropTypes.object).isRequired,
  sets: PropTypes.objectOf(PropTypes.array).isRequired,
  isSynced: PropTypes.bool,
};

SetsView.defaultProps = {
  isSynced: true,
};

export default SetsView;
