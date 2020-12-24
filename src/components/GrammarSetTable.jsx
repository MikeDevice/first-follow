import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import {mapItemToChar, chars} from '../helpers/grammar';

function GrammarSetTable({data, columns, ...props}) {
  data = _.mapValues(data, (items) => _.map(items, mapItemToChar));

  if (props.withEmptyChain) {
    columns = [...columns, chars.emptyChain];
  }

  if (props.withEndMark) {
    columns = [...columns, chars.endMark];
  }

  if (!props.withEmptyColumns) {
    const nonEmptyColumns = [];

    Object.values(data).forEach((arr) => {
      nonEmptyColumns.push(...arr);
    });

    const hash = _.keyBy(nonEmptyColumns);

    columns = columns.filter((column) => hash[column]);
  }

  return <Table data={data} columns={columns} />;
}

GrammarSetTable.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  withEmptyColumns: PropTypes.bool,
  withEmptyChain: PropTypes.bool,
  withEndMark: PropTypes.bool,
};

GrammarSetTable.defaultProps = {
  withEmptyColumns: false,
  withEmptyChain: false,
  withEndMark: false,
};

export default GrammarSetTable;
