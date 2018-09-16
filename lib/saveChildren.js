module.exports = function saveChildren(node) {
  node.children.forEach((child) => {
    // console.log(child.title, child.name);
    this.generateTutorial(child.title, child, this.tutorialToUrl(child.name));
    this.saveChildren(child);
  });
};
