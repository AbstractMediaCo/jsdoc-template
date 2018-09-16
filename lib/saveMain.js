const taffy = require('taffydb').taffy;

module.exports = function saveMain() {
  const members = this.members;
  const classes = taffy(members.classes);
  const modules = taffy(members.modules);
  const namespaces = taffy(members.namespaces);
  const mixins = taffy(members.mixins);
  const externals = taffy(members.externals);
  const interfaces = taffy(members.interfaces);
  const lists = taffy(members.lists);
  const services = taffy(members.services);

  Object.keys(this.longnameToUrl).forEach((longname) => {
    const myModules = this.find(modules, { longname });

    // console.log('lnToURL: ', longname, this.longnameToUrl[longname]);
    if (myModules.length) {
      this.generate('Module', myModules[0].name, myModules, this.longnameToUrl[longname]);
    }

    const myClasses = this.find(classes, { longname });

    if (myClasses.length) {
      this.generate('Class', myClasses[0].name, myClasses, this.longnameToUrl[longname]);
    }

    const myNamespaces = this.find(namespaces, { longname });

    if (myNamespaces.length) {
      this.generate('Namespace', myNamespaces[0].name, myNamespaces, this.longnameToUrl[longname]);
    }

    const myMixins = this.find(mixins, { longname });

    if (myMixins.length) {
      this.generate('Mixin', myMixins[0].name, myMixins, this.longnameToUrl[longname]);
    }

    const myExternals = this.find(externals, { longname });

    if (myExternals.length) {
      this.generate('External', myExternals[0].name, myExternals, this.longnameToUrl[longname]);
    }

    const myInterfaces = this.find(interfaces, { longname });

    if (myInterfaces.length) {
      this.generate('Interface', myInterfaces[0].name, myInterfaces, this.longnameToUrl[longname]);
    }

    const myLists = this.find(lists, { longname });

    if (myLists.length) {
      this.useReactInstead('List', myLists[0].name, myLists, this.longnameToUrl[longname], longname);
    }

    const myServices = this.find(services, { longname });

    if (myServices.length) {
      this.generate('List', myServices[0].name, myServices, this.longnameToUrl[longname], longname);
    }
  });
};
