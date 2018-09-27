

module.exports = function getPathFromDoclet(doclet) {
  if (!doclet.meta) return null;
  return doclet.meta.path && doclet.meta.path !== 'null' ?
    this.path.join(doclet.meta.path, doclet.meta.filename) :
    doclet.meta.filename;
};
