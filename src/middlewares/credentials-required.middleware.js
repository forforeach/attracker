module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send({ message: 'Credentials are missing' });
  } else {
    next();
  }
};
