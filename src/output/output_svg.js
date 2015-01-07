var _ = require('underscore');
var templifyPath = require('../util').templifyPath;
var writeOutFile = require('../util').writeOutFile;
var ent = require("ent");

var templates = {
  // css class template
  pattern : {
    svg: templifyPath("./src/templates/svg/pattern.svg")
  },

  // div using the css class template
  components: {
    rect: templifyPath("./src/templates/svg/rect.html"),
  },

  // css file
  pages: {
    svg: templifyPath("./src/templates/pages/sample_svg.html"),
  }
};

var PatternsToSVG = function(patternData) {

  this.patternData = patternData;

  this.outputStrings = {
    svg : [],
    svgSamples : []
  };

  // iterate over all patterns, and convert them to css
  for(var g = 0; g < this.patternData.groupCount; g++) {

    var group = this.patternData.groups[g];
    this.patternData.groups[g].svg = [];
    this.patternData.groups[g].svgSamples = [];

    for(var i = 0; i < this.patternData.groups[g].patterns.length; i++) {

      var data = this.patternData.groups[g].patterns[i];

      // svg class
      this.patternData.groups[g].svg[i] = templates.pattern.svg(data);

      // sample usage divs
      data.encodedSVG = ent.encode(this.patternData.groups[g].svg[i]);
      this.patternData.groups[g].svgSamples[i] = templates.components.rect(data);
    }
  }
};

PatternsToSVG.prototype.writePages = function() {
  console.log("Writing sample_svg.html");
  writeOutFile("sample_svg.html", templates.pages.svg({
    groups: this.patternData.groups
  }));
};

PatternsToSVG.prototype.patternSvg = function() {
  return this.patternData.groups.map(function(g, i) {
    return g.svg.join("");
  }).join("");
};

module.exports = PatternsToSVG;