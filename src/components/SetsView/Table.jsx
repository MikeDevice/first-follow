import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import CommonTable from '../Table';
import {mapItemToChar, chars} from '../../helpers/grammar';

function Table({data, columns, ...props}) {
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

  return <CommonTable data={data} columns={columns} />;
}

Table.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  withEmptyColumns: PropTypes.bool,
  withEmptyChain: PropTypes.bool,
  withEndMark: PropTypes.bool,
};

Table.defaultProps = {
  withEmptyColumns: false,
  withEmptyChain: false,
  withEndMark: false,
};

export default Table;
