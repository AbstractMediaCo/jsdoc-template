module.exports = function buildItemTypeStrings(item) {
  const types = [];

  if (item && item.type && item.type.names) {
    item.type.names.forEach(function someFunction(name) {
      types.push(this.linkto(name, this.htmlsafe(name)));
    });
  }

  return types;
};
