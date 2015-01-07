var _ = require('underscore');
var templifyPath = require('../util').templifyPath;
var writeOutFile = require('../util').writeOutFile;
var ent = require("ent");

var templates = {
  // css class template
  pattern : {
    css: templifyPath("./src/templates/css/pattern.css")
  },

  // div using the css class template
  components: {
    div: templifyPath("./src/templates/css/div.html"),
  },

  // css file
  pages: {
    patterns_css: templifyPath("./src/templates/pages/patterns.css"),
    css: templifyPath("./src/templates/pages/sample_css.html")
  }
};

var PatternsToCSS = function(patternData) {

  this.patternData = patternData;

  this.outputStrings = {
    css : [],
    divSamples : []
  };

  // iterate over all patterns, and convert them to css
  for(var g = 0; g < this.patternData.groupCount; g++) {

    var group = this.patternData.groups[g];
    this.patternData.groups[g].css = [];
    this.patternData.groups[g].divSamples = [];

    for(var i = 0; i < this.patternData.groups[g].patterns.length; i++) {

      var data = this.patternData.groups[g].patterns[i];

      // css class
      this.patternData.groups[g].css[i] = templates.pattern.css(data);

      // sample usage divs
      data.encodedCSS = ent.encode(this.patternData.groups[g].css[i]);
      this.patternData.groups[g].divSamples[i] = templates.components.div(data);
    }
  }
};

PatternsToCSS.prototype.writePages = function() {
  console.log("Writing pattern.css");
  writeOutFile("patterns.css", this.patternCss());

  console.log("Writing sample_css.html");
  writeOutFile("sample_css.html", templates.pages.css({
    groups: this.patternData.groups
  }));
};

PatternsToCSS.prototype.patternCss = function() {
  return templates.pages.patterns_css({
    groups: this.patternData.groups
  });
};

module.exports = PatternsToCSS;