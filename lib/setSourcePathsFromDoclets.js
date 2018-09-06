module.exports = function setExamples() {
  this.data().each((doclet) => {
    doclet.attribs = '';

    if (doclet.examples) {
      doclet.examples = doclet.examples.map(function eachExample(example) {
        let caption; let code;

        if (example
        .match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
          caption = RegExp.$1;
          code = RegExp.$3;
        }

        return {
          caption: caption || '',
          code: code || example
        };
      });
    }
    if (doclet.see) {
      doclet.see.forEach((seeItem, i) => {
        doclet.see[i] = this.hashToLink(doclet, seeItem);
      });
    }

    // build a list of source files
    let sourcePath;

    if (doclet.meta) {
      sourcePath = this.getPathFromDoclet(doclet);
      this.sourceFiles[sourcePath] = {
        resolved: sourcePath,
        shortened: null
      };
      if (this.sourceFilePaths.indexOf(sourcePath) === -1) {
        this.sourceFilePaths.push(sourcePath);
      }
    }
  });
};
