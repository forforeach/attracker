module.exports = (app) => {
  app.use((err, req, res) => {
    if (err.message === '404') {
      res.status(404).send();
    }
    res.status(422).send({ error: err.message });
  });
};
