const _ = require('lodash');
const files = {};

module.exports = function getUniqFilename(str) {
  const makeUniqueFilename = (filenm, name) => {
    let filename = filenm;
    let key = filename.toLowerCase();
    let nonUnique = true;

    // don't allow filenames to begin with an underscore
    if (!filename.length || filename[0] === '_') {
      filename = '-' + filename;
      key = filename.toLowerCase();
    }

    // append enough underscores to make the filename unique
    while (nonUnique) {
      if (_.has(files, key)) {
        filename += '_';
        key = filename.toLowerCase();
      } else nonUnique = false;
    }

    files[key] = name;

    return filename;
  };

  let basename = (str || '')
  // use - instead of : in namespace prefixes
  .replace(':', '-')
  // replace characters that can cause problems on some filesystems
  .replace(/[\\/?*:|'"<>]/g, '_')
  // use - instead of ~ to denote 'inner'
  .replace(/~/g, '-')
  // use _ instead of # to denote 'instance'
  .replace(/#/g, '_')
  // use _ instead of / (for example, in module names)
  .replace(/\//g, '_')
  // remove the variation, if any
  .replace(/\([\s\S]*\)$/, '')
  // make sure we don't create hidden files, or files whose names start with a dash
  .replace(/^[.-]/, '')
  .replace(/ /, '-');

  // in case we've now stripped the entire basename (uncommon, but possible):
  basename = basename.length ? basename : '_';
  return `${makeUniqueFilename(basename, str)}.html`;
};
