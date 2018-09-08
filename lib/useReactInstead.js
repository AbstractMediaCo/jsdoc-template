/* global env:true */
const fs = require('jsdoc/fs');
const path = require('jsdoc/path');
const ReactEngine = require('jsdoc-react-engine');
module.exports = function useReact(type, title, docs, filename, longname) {
  const docData = { type, title, docs };
  console.log(filename);
  const outpath = path.join(this.outdir, filename);

  const html = ReactEngine.render(type, {
    type,
    title,
    docs,
    db: this.data,
    initialQuery: { memberof: longname },
    conf: env.conf,
    nav: this.view.nav,
    ...docData,
  });

  // if (resolve) { html = this.resolveLinks(html); }
  fs.writeFileSync(outpath, html, 'utf8');
};
