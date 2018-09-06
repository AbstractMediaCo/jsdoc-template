const util = require('util');

module.exports = function addAttribs(f) {
  const attribs = this.getAttribs(f);
  const attribsString = this.buildAttribsString(attribs);

  f.attribs = util.format('<span class="type-signature">%s</span>', attribsString);
};
