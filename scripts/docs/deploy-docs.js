const ghpages = require('gh-pages');

ghpages.publish('services-docs', function (err) {
  if (err) {
    console.error(err);
  }
  console.log('Documentation was deployed succesfully');
});
