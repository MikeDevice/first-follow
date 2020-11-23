import _ from 'lodash-es';

const EMPTY_CHAIN = null;
const END_MARK = '\0';

const nonterminal = '[A-Za-z_]\\w*';

export const regexesContent = {
  startOfRule: `\\s*${nonterminal}`,
  nonterminal,
};

export const chars = {
  arrow: '\u27f6',
  emptyChain: '\u03b5',
  endMark: '\u2524',
};

const itemsHash = {
  [EMPTY_CHAIN]: chars.emptyChain,
  [END_MARK]: chars.endMark,
};

export function mapItemToChar(item) {
  return itemsHash[item] || item;
}

export function getTerminals(rules) {
  const terminals = [];
  const nonterminalsHash = _.keyBy(rules.map(({left}) => left));

  rules.forEach(({right}) => {
    right.forEach((item) => {
      if (item !== EMPTY_CHAIN && !nonterminalsHash[item]) {
        terminals.push(item);
      }
    });
  });

  return _.uniq(terminals);
}

function parseLeftPart(str) {
  const regex = new RegExp(`^${nonterminal}$`);
  const result = str.trim().match(regex);

  return result && result[0];
}

function parseRightPart(str) {
  if (!_.isString(str)) return null;

  str = str.trim();

  return str ? _.compact(str.split(/\s+/)) : [EMPTY_CHAIN];
}

function parseRow(row) {
  const [left, right] = row.split(chars.arrow);
  const parsedLeft = parseLeftPart(left);

  if (!parsedLeft) {
    return {error: 'INCORRECT_START_OF_RULE'};
  }

  const parsedRight = parseRightPart(right);

  if (!parsedRight) {
    return {error: 'INCORRECT_REST_OF_RULE'};
  }

  return {
    left: parseLeftPart(left),
    right: parseRightPart(right),
  };
}

export function parse(rows) {
  return rows
    .filter((row) => row.length)
    .map((row, index) => ({
      number: index + 1,
      ...parseRow(row),
    }));
}
