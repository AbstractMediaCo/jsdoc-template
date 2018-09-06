const path = require('jsdoc/path');
const fs = require('jsdoc/fs');
const Filter = require('jsdoc/src/filter').Filter;
const Scanner = require('jsdoc/src/scanner').Scanner;

module.exports = function generateStaticFiles() {
  this.staticFilePaths;
  this.staticFileFilter;
  this.staticFileScanner;
  const fromDir = path.join(this.templatePath, 'static');
  const staticFiles = fs.ls(fromDir, 3);

  staticFiles.forEach((fileName) => {
    const toDir = fs.toDir(fileName.replace(fromDir, this.outdir));

    fs.mkPath(toDir);
    fs.copyFileSync(fileName, toDir);
  });

  if (this.conf.default.staticFiles) {
    // The canonical property name is `include`.
    // We accept `paths` for backwards compatibility
    // with a bug in JSDoc 3.2.x.
    this.staticFilePaths = this.conf.default.staticFiles.include ||
      this.conf.default.staticFiles.paths || [];

    this.staticFileFilter = new Filter(this.conf.default.staticFiles);
    this.staticFileScanner = new Scanner();

    this.staticFilePaths.forEach(function eachStatic(filePath) {
      const extraStaticFiles = this.staticFileScanner
      .scan([filePath], 10, this.staticFileFilter);

      extraStaticFiles.forEach(function eachExtra(fileName) {
        const sourcePath = fs.toDir(filePath);
        const toDir = fs.toDir(fileName.replace(sourcePath, this.outdir));

        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
      });
    });
  }
};
