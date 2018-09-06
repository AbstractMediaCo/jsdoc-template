const _ = require('lodash');
module.exports = function getId(longname, ID) {
  let id = ID;
  if (_.has(this.longnameToId, [longname]) ) id = this.longnameToId[longname];
  else if (!id) return '';
  else { id = this.getUniqueId(longname, id); this.registerId(longname, id); }
  return id;
};
