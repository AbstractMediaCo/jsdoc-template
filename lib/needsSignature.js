module.exports = function needsSignature(doclet) {
  let i; let l;
  let needsSig = false;

  // function and class definitions always get a signature
  if (doclet.kind === 'function' || doclet.kind === 'class') {
    needsSig = true;
  } else if (doclet.kind === 'typedef' && doclet.type && doclet.type.names &&
        doclet.type.names.length) { // typedefs that contain functions get a signature, too
    for (i = 0, l = doclet.type.names.length; i < l; i++) {
      if (doclet.type.names[i].toLowerCase() === 'function') {
        needsSig = true;
        break;
      }
    }
  }

  return needsSig;
};
