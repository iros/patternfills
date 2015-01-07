var _ = require('underscore');
var templifyPath = require('../util').templifyPath;
var writeOutFile = require('../util').writeOutFile;
var ent = require("ent");

var templates = {
  // css class template
  pattern : {
    svg: templifyPath("svg/pattern.svg")
  },

  // div using the css class template
  components: {
    d3Snippet: templifyPath("d3/d3Snippet.js")
  },

  // css file
  pages: {
    d3: templifyPath("pages/sample_d3.html")
  }
};

var PatternsToD3 = function(patternData) {

  this.patternData = patternData;

  this.outputStrings = {
    svg : [],
    d3Samples : []
  };

  // iterate over all patterns, and convert them to css
  for(var g = 0; g < this.patternData.groupCount; g++) {

    var group = this.patternData.groups[g];
    this.patternData.groups[g].svg = [];
    this.patternData.groups[g].d3Samples = [];

    for(var i = 0; i < this.patternData.groups[g].patterns.length; i++) {

      var data = this.patternData.groups[g].patterns[i];

      // svg class
      this.patternData.groups[g].svg[i] = templates.pattern.svg(data);

      // sample usage divs
      data.encodedSVG = ent.encode(this.patternData.groups[g].svg[i]);
      this.patternData.groups[g].d3Samples[i] = templates.components.d3Snippet(data);
    }
  }
};

PatternsToD3.prototype.writePages = function() {
  console.log("Writing sample_d3.html");
  writeOutFile("sample_d3.html", templates.pages.d3({
    groups: this.patternData.groups
  }));
};

module.exports = PatternsToD3;