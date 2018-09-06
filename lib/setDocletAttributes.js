module.exports = function setDocletAttrs() {
  this.data().each((doclet) => {
    const url = this.longnameToUrl[doclet.longname];

    if (url.indexOf('#') > -1) {
      doclet.id = this.longnameToUrl[doclet.longname].split(/#/).pop();
    } else doclet.id = doclet.name;

    if (this.needsSignature(doclet)) {
      this.addSignatureParams(doclet);
      this.addSignatureReturns(doclet);
      this.addAttribs(doclet);
    }
  });


  this.data().each((doclet) => {
    const getAncestorLinks = () => this.getAncestorLinks(this.data, doclet);
    doclet.ancestors = getAncestorLinks(doclet);

    if (
      doclet.kind === 'member' ||
      doclet.kind === 'event' ||
      doclet.kind === 'typedef' &&
      doclet.signature === null
    ) {
      this.addSignatureTypes(doclet);
      this.addAttribs(doclet);
    }

    if (doclet.kind === 'constant') {
      this.addSignatureTypes(doclet);
      this.addAttribs(doclet);
      doclet.kind = 'member';
    }
  });
};
