// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Wrong token' });
  } else {
    res.status(500).json({ error: 'Internal server error', id: err.traceId });
  }
};
