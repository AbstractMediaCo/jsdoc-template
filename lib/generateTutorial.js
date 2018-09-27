module.exports = function generateTutorial(title, tutorial, filename) {
  const tutorialData = {
    title,
    header: tutorial.title,
    content: tutorial.parse(),
    children: tutorial.children
  };

  const tutorialPath = this.path.join(this.outdir, filename);
  let html = this.view.render('tutorial.tmpl', tutorialData);
  html = this.resolveLinks(html);
  this.fs.writeFileSync(tutorialPath, html, 'utf8');
};
