module.exports = function shortenPaths(files, commonPrefix) {
  Object.keys(files).forEach(function someFunction(file) {
    files[file].shortened = files[file].resolved.replace(commonPrefix, '')
    // always use forward slashes
    .replace(/\\/g, '/');
  });

  return files;
};
