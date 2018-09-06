module.exports = function linkToTutorial(tutorial) {
  return this.toTutorial(tutorial, null, {
    tag: 'em', classname: '', prefix: 'Guide: '
  });
};
