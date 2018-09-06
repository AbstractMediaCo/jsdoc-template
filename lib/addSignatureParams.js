
const util = require('util');

function getSignatureAttributes(item) {
  const attributes = [];

  if (item.optional) {
    attributes.push('opt');
  }

  if (item.nullable === true) {
    attributes.push('nullable');
  } else if (item.nullable === false) {
    attributes.push('non-null');
  }

  return attributes;
}

function updateItemName(item) {
  const attributes = getSignatureAttributes(item);
  let itemName = item.name || '';

  if (item.variable) {
    itemName = '&hellip;' + itemName;
  }

  if (attributes && attributes.length) {
    itemName = util.format('%s<span class="signature-attributes">%s</span>', itemName,
      attributes.join(', '));
  }

  return itemName;
}

function addParamAttributes(params) {
  return params.filter(function someFunction(param) {
    return param.name && param.name.indexOf('.') === -1;
  }).map(updateItemName);
}

module.exports = function addSignatureParams(f) {
  const params = f.params ? addParamAttributes(f.params) : [];

  f.signature = util.format('%s(%s)', f.signature || '', params.join(', '));
};
