const ghpages = require('gh-pages');

ghpages.publish('apidoc', function (err) {
  if (err) {
    console.error(err);
  }
  console.log('API Documentation was deployed succesfully');
});
