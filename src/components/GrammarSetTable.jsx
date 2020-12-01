import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import {mapItemToChar, chars} from '../helpers/grammar';

function GrammarSetTable({data, columns, withEmptyChain, withEndMark}) {
  data = _.mapValues(data, (items) => _.map(items, mapItemToChar));

  if (withEmptyChain) {
    columns = [...columns, chars.emptyChain];
  }

  if (withEndMark) {
    columns = [...columns, chars.endMark];
  }

  return <Table data={data} columns={columns} />;
}

GrammarSetTable.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  withEmptyChain: PropTypes.bool,
  withEndMark: PropTypes.bool,
};

GrammarSetTable.defaultProps = {
  withEmptyChain: false,
  withEndMark: false,
};

export default GrammarSetTable;
