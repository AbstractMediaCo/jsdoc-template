const doop = require('jsdoc/util/doop');
const _ = require('lodash');
module.exports = function attachModuleSymbols(type) {
  const doclets = this.findSpec({ longname: { left: `${type}:` }});
  const members = this.members[type];
  const symbols = {};
  // console.log({ doclets });
  // build a lookup table
  doclets.forEach((symbol) => {
    // console.log({ symbol });
    symbols[symbol.longname] = symbols[symbol.longname] || [];
    symbols[symbol.longname].push(symbol);
  });
  // console.log({ members });
  return _.map(members, (member) => {
    if (symbols[member.longname]) {
      member[type] = symbols[module.longname]
      // Only show symbols that have a description. Make an exception for classes, because
      // we want to show the constructor-signature heading no matter what.
      .filter(function filterSymbols(symbol) {
        return symbol.description || symbol.kind === 'class';
      })
      .map(function mapFilteredSymbols(symb) {
        const symbol = doop(symb);

        if (symbol.kind === 'class' || symbol.kind === 'function') {
          symbol.name = symbol.name.replace('module:', '(require("') + '"))';
        }

        if (symbol.kind === 'list') {
          console.log('found list: ', symbol);
          symbol.name = symbol.name.replace('list:', '(require("') + '"))';
        }
        return symbol;
      });
    }
  });
};
