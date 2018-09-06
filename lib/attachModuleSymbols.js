const doop = require('jsdoc/util/doop');

module.exports = function attachModuleSymbols() {
  const doclets = this.findSpec({ longname: { left: 'module:' }});
  const modules = this.members.modules;
  const symbols = {};

  // build a lookup table
  doclets.forEach((symbol) => {
    symbols[symbol.longname] = symbols[symbol.longname] || [];
    symbols[symbol.longname].push(symbol);
  });

  return modules.map((module) => {
    if (symbols[module.longname]) {
      module.modules = symbols[module.longname]
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

        return symbol;
      });
    }
  });
};
