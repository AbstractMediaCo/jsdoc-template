const _ = require('lodash');
const path = require('path');

module.exports = function generateStaticFiles() {
  const { default: _default = {}, abstract = {}} = this.conf;
  const conf = _.defaults(_default.static, abstract.static);
  if (conf.disable) return;
  const fs = require('jsdoc/fs');
  const Filter = require('jsdoc/src/filter').Filter;
  const Scanner = require('jsdoc/src/scanner').Scanner;
  const outdir = conf.dest || this.outdir;
  this.staticFilePaths;
  this.staticFileFilter;
  this.staticFileScanner;

  const fromDir = path.join(this.templatePath, 'static');
  const staticFiles = fs.ls(fromDir, 3);

  staticFiles.forEach((fileName) => {
    const toDir = fs.toDir(fileName.replace(fromDir, outdir));
    fs.mkPath(toDir);
    fs.copyFileSync(fileName, toDir);
  });
  if (conf.staticFiles) {
    // The canonical property name is `include`.
    // We accept `paths` for backwards compatibility
    // with a bug in JSDoc 3.2.x.
    this.staticFilePaths = conf.staticFiles.include ||
      conf.staticFiles.paths || [];

    this.staticFileFilter = new Filter(conf.staticFiles);
    this.staticFileScanner = new Scanner();

    this.staticFilePaths.forEach(function eachStatic(filePath) {
      const extraStaticFiles = this.staticFileScanner
      .scan([filePath], 10, this.staticFileFilter);

      extraStaticFiles.forEach(function eachExtra(fileName) {
        const sourcePath = fs.toDir(filePath);
        const toDir = fs.toDir(fileName.replace(sourcePath, outdir));

        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
      });
    });
  }
  return;
};
