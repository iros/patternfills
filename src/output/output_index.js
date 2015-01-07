var _ = require('underscore');
var templifyPath = require('../util').templifyPath;
var writeOutFile = require('../util').writeOutFile;
var ent = require("ent");

var templates = {
  // index file
  pages: {
    index: templifyPath("pages/index.html"),
  }
};

var PatternsToIndex = function(patternData) {
  this.patternData = patternData;
};

PatternsToIndex.prototype.writePages = function() {
  console.log("Writing index.html");
  writeOutFile("index.html", templates.pages.index({
    patterns: "\"" + this.patternData.patternNames.join("\",\"") + "\""
  }));
};

module.exports = PatternsToIndex;