const fs = require('jsdoc/fs');
const path = require('jsdoc/path');

module.exports = function generateTutorial(title, tutorial, filename) {
  const tutorialData = {
    title,
    header: tutorial.title,
    content: tutorial.parse(),
    children: tutorial.children
  };

  const tutorialPath = path.join(this.outdir, filename);
  let html = this.view.render('tutorial.tmpl', tutorialData);

  html = this.resolveLinks(html);
  fs.writeFileSync(tutorialPath, html, 'utf8');
};
