/* global env:true */
const ReactEngine = require('jsdoc-react-engine');

module.exports = async function wReact(type, title, docs, filename, longname) {
  const docData = { type, title, docs };
  const outpath = this.path.join(this.outdir, filename);
  const html = await ReactEngine.render(type, {
    type,
    title,
    docs,
    db: this.data,
    initialQuery: { memberof: longname },
    conf: env.conf,
    nav: this.view.nav,
    ...docData,
  });
  // console.log('@useReactIntead', { title, html });
  this.fs.writeFileSync(outpath, html, 'utf8');
};
