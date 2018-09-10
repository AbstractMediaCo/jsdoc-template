const pluralize = require('pluralize');

module.exports = function setMembers() {
  const db = this.data;
  const memberRange = db().distinct('kind');
  const globals = db({
    kind: ['member', 'function', 'constant', 'typedef'],
    memberof: { isUndefined: true }
  }).get();

  if (memberRange.length) {
    this.members = memberRange.reduce((memo, member) => {
      return { ...memo, [pluralize(member)]: db({ kind: member }).get() };
    }, { globals });
  } else this.members = [];

  this.members.tutorials = this.tutorials.children;
};
