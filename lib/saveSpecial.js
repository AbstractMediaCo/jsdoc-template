module.exports = function saveSpecial() {
  if (this.members.globals.length) {
    this.generate('', 'Global', [{ kind: 'globalobj' }], this.globalUrl);
  }
  const files = this.findSpec({ kind: 'file' });
  const packages = this.findSpec({ kind: 'package' });
  this.generate('', 'Home', packages.concat([{
    kind: 'mainpage',
    readme: this.opts.readme,
    longname: this.opts.mainpagetitle ? this.opts.mainpagetitle : 'Main Page'
  }]).concat(files), this.indexUrl);
};
