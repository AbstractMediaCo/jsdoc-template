const util = require('util');

module.exports = function addSignatureReturns(f) {
  const addNonParamAttributes = (items) => {
    let types = [];

    items.forEach((item) => {
      types = types.concat(this.buildItemTypeStrings(item));
    });

    return types;
  };

  const attribs = [];
  let attribsString = '';
  let returnTypes = [];
  let returnTypesString = '';

  // jam all the return-type attributes into an array. this could create odd results (for example,
  // if there are both nullable and non-nullable return types), but let's assume that most people
  // who use multiple @return tags aren't using Closure Compiler type annotations, and vice-versa.
  if (f.returns) {
    f.returns.forEach((item) => {
      this.getAttribs(item).forEach(function eachAttrib(attrib) {
        if (attribs.indexOf(attrib) === -1) attribs.push(attrib);
      });
    });

    attribsString = this.buildAttribsString(attribs);
  }

  if (f.returns) returnTypes = addNonParamAttributes(f.returns);
  if (returnTypes.length) {
    returnTypesString = util.format(' &rarr; %s{%s}', attribsString, returnTypes.join('|'));
  }

  f.signature = '<span class="signature">' + (f.signature || '') + '</span>' +
        '<span class="type-signature">' + returnTypesString + '</span>';
};
