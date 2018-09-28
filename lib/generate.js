/* global env:true */
const ReactEngine = require('jsdoc-react-engine');
const _ = require('lodash');

module.exports = async function gen(type, title, docs, filename, resolveLinks) {
  const resolve = resolveLinks !== false;
  const docData = { type, title, docs };
  let content = this.view.render('container.tmpl', docData);
  let parse = false;
  const template = 'Basic';
  const outpath = this.path.join(this.outdir, filename);
  if (title === 'Home') {
    /* use md parser in react engine instead, b/c jsdoc's is fucked. */
    if (_.isString(env.conf.opts.readme)) {
      parse = { src: env.conf.opts.readme, lang: 'md' };
    }
  }

  if (resolve) { content = this.resolveLinks(content); }
  const html = await ReactEngine.render(template, {
    conf: env.conf,
    content,
    docs,
    nav: this.view.nav,
    title,
    type,
    docData,
    parse
  });
  this.fs.writeFileSync(outpath, html, 'utf8');
};
