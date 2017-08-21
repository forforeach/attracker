module.exports = (app) => {
  app.use(function (req, res, next) {
    next('404');
  });
};
