/* global env:true */
const fs = require('jsdoc/fs');
const path = require('jsdoc/path');
module.exports = function formatData(taffyData) {
  this.sourceFiles = {};
  this.sourceFilePaths = [];

  this.data = this.prune(taffyData);
  if (!this.conf.disableSort) {
    this.data.sort('longname, version, since');
  }

  this.addEventListeners(this.data);
  this.setSourcePathsFromDoclets();

  fs.mkPath(this.outdir);
  // this.generateStaticFiles();
  if (this.sourceFilePaths.length) {
    this.sourceFiles = this.shortenPaths(
      this.sourceFiles, path.commonPrefix(this.sourceFilePaths));
  }

  this.setDocletPaths();
  this.setDocletAttributes();
};
