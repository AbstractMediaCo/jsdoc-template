const _ = require('lodash');

module.exports = function memberNav(type, itemHeading, itemsSeen) {
  const linktoFn = type === 'tutorials' ? this.linkToTutorial : this.linkto;
  const items = this.members[type];
  let nav = '';
  let itemsNav = '';

  if (items && items.length) {
    items.forEach((item) => {
      // console.log({ item });
      const methods = this.findSpec({ kind: 'function', memberof: item.longname });

      if (!_.has(item, ['longname'])) {
        itemsNav += '<li id="' + item.name.replace('/', '_') + '-nav">' + linktoFn('', item.name);
        itemsNav += '</li>';
      } else if (!_.has(itemsSeen, [item.longname])) {
        // replace '/' in url to match ID in some section
        itemsNav += '<li id="' +
        item.name.replace('/', '_') + '-nav">' +
        linktoFn(item.longname, item.name.replace(/^module:|list:/, ''));

        if (methods.length) {
          itemsNav += '<ul class=\'methods\'>';

          methods.forEach((method) => {
            itemsNav += '<li data-type="method" id="' + item.name.replace('/', '_') + '-' + method.name + '-nav">';
            itemsNav += this.linkto(method.longname, method.name);
            itemsNav += '</li>';
          });

          itemsNav += '</ul>';
        }
        itemsNav += '</li>';
        itemsSeen[item.longname] = true;
      }
    });

    if (itemsNav !== '') {
      nav += '<h3>' + itemHeading + '</h3><ul>' + itemsNav + '</ul>';
    }
  }

  return nav;
};
