const _ = require('lodash');
const dictionary = require('jsdoc/tag/dictionary');
const { scopeToPunc, SCOPE } = require('jsdoc/name');

/**
 * Check whether a symbol is the only symbol exported by a module (as in
 * `module.exports = function() {};`).
 *
 * @private
 * @param {module:jsdoc/doclet.Doclet} doclet - The doclet for the symbol.
 * @return {boolean} `true` if the symbol is the only symbol exported by a module; otherwise,
 * `false`.
 */
const isModuleExports = ({ kind, longname, name, }) =>
  longname && longname === name && _.includes(longname, 'module') && kind !== 'module';

function getNamespace(kind) {
  // console.log('############### dictionary has: ', kind, dictionary.isNamespace(kind));
  if (dictionary.isNamespace(kind)) return kind + ':';
  return '';
}

function formatNameForLink(doclet) {
  const { scope, name, kind, variation } = doclet;
  let newName = getNamespace(kind) + (name || '') + (variation || '');
  const scopePunc = scopeToPunc[scope] || '';

  // Only prepend the scope punctuation if it's not the same character that
  // marks the start of a fragment ID. Using `#` in HTML5 fragment IDs is
  // legal, but URLs like `foo.html##bar` are just confusing.
  if (scopePunc !== '#') newName = scopePunc + newName;
  return newName;
}


module.exports = function createLink(doclet) {
  const { scope, name, kind, memberof, longname } = doclet;
  // console.log({ name, kind, memberof });

  const fragHash = (frag) => frag ? `#${frag}` : '';

  const getFilename = (longName) => {
    let fileUrl;
    if (_.has(this.longnameToUrl, [longName]) ) {
      fileUrl = this.longnameToUrl[longName];
    } else {
      fileUrl = this.getUniqueFilename(longName);
      this.registerLink(longName, fileUrl);
    }
    return fileUrl;
  };


  const containers = [
    'class',  'module', 'external', 'namespace', 'mixin', 'interface',
    'list', 'service'
  ];

  let fakeContainer;
  let filename;
  let fragment = '';
  let match;

  // handle doclets in which doclet.longname implies that the doclet gets its own HTML file, but
  // kind says otherwise. this happens due to mistagged JSDoc
  // (for example, a module that somehow has kind set to `member`).
  // TODO: generate a warning (ideally during parsing!)
  if (containers.indexOf(kind) === -1) {
    match = /(\S+):/.exec(longname);

    if (match && containers.indexOf(match[1]) !== -1) fakeContainer = match[1];
  }

  // the doclet gets its own HTML file
  if (containers.indexOf(kind) !== -1 || isModuleExports(doclet)) {
    filename = getFilename(longname);
  } else if ( containers.indexOf(kind) === -1 && fakeContainer ) {
    // mistagged version of a doclet that gets its own HTML file
    filename = getFilename(memberof || longname);
    if (name !== doclet.longname) {
      fragment = formatNameForLink(doclet);
      fragment = this.getId(longname, fragment);
    }
  } else { // the doclet is within another HTML file
    filename = getFilename(memberof || exports.globalName);
    if (
      (name !== doclet.longname) ||
      (scope === SCOPE.NAMES.GLOBAL)
    ) {
      fragment = formatNameForLink(doclet);
      fragment = this.getId(longname, fragment);
    }
  }

  return encodeURI(filename + fragHash(fragment));
};
