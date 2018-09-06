module.exports = function hashToLink(doclet, hash) {
  if (!/^(#.+)/.test(hash)) { return hash; }

  let url = this.createLink(doclet);

  url = url.replace(/(#.+|$)/, hash);
  return '<a href="' + url + '">' + hash + '</a>';
};
