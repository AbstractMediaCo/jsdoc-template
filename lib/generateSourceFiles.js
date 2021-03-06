module.exports = function generateSourceFiles(sourceFiles, encoding = 'utf8') {
  Object.keys(sourceFiles).forEach((file) => {
    let source;
    // links are keyed to the shortened path in each doclet's `meta.shortpath` property
    const sourceOutfile = this.getUniqueFilename(sourceFiles[file].shortened);

    this.registerLink(sourceFiles[file].shortened, sourceOutfile);

    try {
      source = {
        kind: 'source',
        code: this.htmlsafe(
          this.fs.readFileSync(sourceFiles[file].resolved, encoding)
        )
      };
    } catch (e) {
      this.logger.error('Error while generating source file %s: %s', file, e.message);
    }

    this.generate('Source',
      sourceFiles[file].shortened,
      [source],
      sourceOutfile,
      false
    );
  });
};
