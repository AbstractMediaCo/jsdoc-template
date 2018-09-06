/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @param {array<object>} members.interfaces
 * @param {array<object>} members.lists
 * @return {string} The HTML for the navigation sidebar.
 */
module.exports = function buildNav(members) {
  let nav = '';
  let globalNav = '';
  const seen = {};
  const seenTutorials = {};

  nav += this.buildMemberNav('classes', 'Classes', seen);
  nav += this.buildMemberNav('modules', 'Modules', {});
  nav += this.buildMemberNav('lists', 'Data Models', {});
  nav += this.buildMemberNav('tutorials', 'Guides', seenTutorials);
  // TODO: as needed, comment back in later
  // nav += buildMemberNav(members.externals, 'Externals', seen, linktoExternal);
  // nav += buildMemberNav(members.events, 'Events', seen, linkto);
  // nav += buildMemberNav(members.namespaces, 'Namespaces', seen, linkto);
  // nav += buildMemberNav(members.mixins, 'Mixins', seen, linkto);
  // nav += buildMemberNav(members.interfaces, 'Interfaces', seen, linkto);

  if (members.globals.length) {
    members.globals.forEach(function someFunction(g) {
      if (g.kind !== 'typedef' && !this.hasOwnProp.call(seen, g.longname)) {
        globalNav += '<li>' + this.linkto(g.longname, g.name) + '</li>';
      }
      seen[g.longname] = true;
    });

    if (!globalNav) {
      // turn the heading into a link so you can actually get to the global page
      nav += '<h3 id="global-nav">' + this.linkto('global', 'Global') + '</h3>';
    } else {
      nav += '<h3 id="global-nav">Global</h3><ul>' + globalNav + '</ul>';
    }
  }

  return nav;
};
