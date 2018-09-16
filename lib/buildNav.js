const _ = require('lodash');
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
  nav += this.buildMemberNav('services', 'Services', {});
  nav += this.buildMemberNav('tutorials', 'Guides', seenTutorials);
  // TODO: as needed, comment back in later
  nav += this.buildMemberNav('externals', 'Externals', seen);
  nav += this.buildMemberNav('events', 'Events', seen);
  nav += this.buildMemberNav('namespaces', 'Namespaces', seen);
  nav += this.buildMemberNav('mixins', 'Mixins', seen);
  nav += this.buildMemberNav('interfaces', 'Interfaces', seen);

  if (members.globals.length) {
    members.globals.forEach((g) => {
      // console.log({ g });
      if (g.kind !== 'typedef' && !_.has(seen, [g.longname])) {
        globalNav += '<li>' + this.linkto(g.longname, g.name) + '</li>';
      }
      seen[g.longname] = true;
    });

    if (!globalNav) {
      // turn the heading into a link so you can actually get to the global page
      nav += '<h3 id="global-nav">' + this.linkto('global', 'Global') + '</h3>';
    } else nav += '<h3 id="global-nav">Global</h3><ul>' + globalNav + '</ul>';
  }

  return nav;
};
