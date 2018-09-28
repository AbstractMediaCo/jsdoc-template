/* global env:true */
// const _ = require('lodash');
const ReactEngine = require('../../jsdoc-react-engine');
module.exports = async function generateTutorial(title, tutorial, filename) {
  const tutorialPath = this.path.join(this.outdir, filename);
  const data = {
    conf: env.conf,
    title,
    nav: this.view.nav,
    tutorial: {
      ...tutorial,
      lang: 'md',
      md: tutorial.content
    },
  };
  delete tutorial.content;
  // const content = this.view.render('tutorial.tmpl', data);
  // content = this.resolveLinks(content);
  const html = await ReactEngine.render('Guide', data);
  this.fs.writeFileSync(tutorialPath, html, 'utf8');
};
