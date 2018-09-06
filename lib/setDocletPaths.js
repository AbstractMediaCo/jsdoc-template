module.exports = function setDocletPaths() {
  this.data().each((doclet) => {
    let docletPath;
    const url = this.createLink(doclet);
    // console.log({ name: doclet.longname, url });
    this.registerLink(doclet.longname, url);

    // add a shortened version of the full path
    if (doclet.meta) {
      docletPath = this.getPathFromDoclet(doclet);
      docletPath = this.sourceFiles[docletPath].shortened;
      if (docletPath) {
        doclet.meta.shortpath = docletPath;
      }
    }
  });
};
