module.exports = function saveChildren(node) {
  node.children.forEach((child) => {
    this.generateTutorial(child.title, child, this.tutorialToUrl(child.name));
    this.saveChildren(child);
  });
};
