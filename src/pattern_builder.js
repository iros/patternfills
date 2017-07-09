var btoa = require("btoa");
var d3 = require("d3");
var jsdom = require("jsdom");
var fs = require("fs");
var path = require("path");
var _ = require("underscore");

var PatternBuilder = function(root, options) {

  this.root = root;
  this.patterns = [];     // cache all data
  this.patternNames = []; // cache names
  this.groups = [];       // cache patterns with their groups

  this.colors = {
    foreground : options.foreground || '#ffffff',
    background : options.background || '#000000'
  };

};

// Determines if a pattern group is valid. It needs to be a directory
// that is not a system directory. Note this is probably too mac
// specific...
PatternBuilder.prototype._isValid = function(patternGroupName) {
  return (patternGroupName !== ".DS_Store" &&
    fs.lstatSync(path.join(this.root,patternGroupName)).isDirectory());
};

// generates data for a single pattern
PatternBuilder.prototype.getSinglePatternData = function(patternGroupName, patternFile) {

  var patternFilePath = path.join(this.root, patternGroupName, patternFile);
  var patternName = /(.*).svg/.exec(patternFile)[1];

  // read the svg pattern data from the filesystem
  var pattern = fs.readFileSync(path.join(patternFilePath), { encoding: "utf-8" });

  // compile the pattern with the colors
  pattern = _.template(pattern, this.colors);

  // base64 encode th pattern
  var b64 = btoa(pattern);
  b64 = "data:image/svg+xml;base64," + b64;

  // make a mock node with d3 for the pattern, and get its dimensions.
  var document = new jsdom.JSDOM().window.document,
      mockNode = d3.select(document.body).html(pattern);

  var height = mockNode.select("svg").attr("height");
  var width = mockNode.select("svg").attr("width");

  return {
    height: height,
    width: width,
    name: patternName,
    imagedata: b64,
    pattern: pattern
  };
};

// aggregates data for a single group of patterns
PatternBuilder.prototype.getGroupPatternData = function(patternGroupName) {
  var self = this;

  if (self._isValid(patternGroupName)) {

    var group = {
      name : /([0-9]+\-)(.+)/.exec(patternGroupName)[2],
      patterns: []
    };

    var patternGroup = fs.readdirSync(path.join(self.root, patternGroupName));

    patternGroup.forEach(function(patternFile, patternIndex) {
       var data = self.getSinglePatternData(patternGroupName, patternFile);

       self.patternNames.push(data.name); // just pattern names
       self.patterns.push(data);  // all patterns together
       group.patterns.push(data); // all patterns by group
    });

    this.groups.push(group);
  }
};

// aggregates all the patterns in a folder
PatternBuilder.prototype.getAllPatternData = function() {
  var self = this;
  var patternGroups = fs.readdirSync(self.root);
  var processingCount = patternGroups.length - 1; //-.DS_Store

  patternGroups.forEach(function(patternGroupName, groupIndex) {
    self.getGroupPatternData(patternGroupName);
  });

  return {
    patterns: self.patterns,
    groups: self.groups,
    patternNames : self.patternNames,
    count: self.patterns.length,
    groupCount: self.groups.length
  };
};

module.exports = PatternBuilder;