module.exports = process.env.NODE_ENV === 'development'
  ? require('./development')
  : require('./production');
