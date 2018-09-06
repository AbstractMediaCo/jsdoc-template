module.exports = function addSignatureTypes(f) {
  const types = f.type ? this.buildItemTypeStrings(f) : [];

  f.signature = (f.signature || '') + '<span class="type-signature">' +
        (types.length ? ' :' + types.join('|') : '') + '</span>';
};
