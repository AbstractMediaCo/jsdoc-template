const util = require('util');

module.exports = function buildAttribsString(attribs) {
  let attribsString = '';

  if (attribs && attribs.length) {
    attribsString = this.htmlsafe(util.format('(%s) ', attribs.join(', ')));
  }

  return attribsString;
};
