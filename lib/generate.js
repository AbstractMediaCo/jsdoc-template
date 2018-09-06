const fs = require('jsdoc/fs');
const path = require('jsdoc/path');

module.exports = function generate(type, title, docs, filename, resolveLinks) {
  const resolve = resolveLinks !== false;
  const docData = { type, title, docs };

  const outpath = path.join(this.outdir, filename);
  let html = this.view.render('container.tmpl', docData);

  if (resolve) { html = this.resolveLinks(html); }
  fs.writeFileSync(outpath, html, 'utf8');
};
