/* global env:true */
const ReactEngine = require('jsdoc-react-engine');

module.exports = async function wReact(type, title, docs, filename, longname) {
  const outpath = this.path.join(this.outdir, filename);
  const html = await ReactEngine.render(type, {
    conf: env.conf,
    db: this.data,
    initialQuery: { memberof: longname },
    nav: this.view.nav,
    parsed: docs[0],
    title,
    type
  });
  this.fs.writeFileSync(outpath, html, 'utf8');
};
