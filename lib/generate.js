/* global env:true */
const fs = require('jsdoc/fs');
const path = require('path');
const ReactEngine = require('jsdoc-react-engine');

module.exports = function generate(type, title, docs, filename, resolveLinks) {
  const resolve = resolveLinks !== false;
  const docData = { type, title, docs };

  const outpath = path.join(this.outdir, filename);
  let content = this.view.render('container.tmpl', docData);

  if (resolve) { content = this.resolveLinks(content); }

  const html = ReactEngine.render('Basic', {
    conf: env.conf,
    content,
    docs,
    nav: this.view.nav,
    title,
    type,
  });
  fs.writeFileSync(outpath, html, 'utf8');
};
