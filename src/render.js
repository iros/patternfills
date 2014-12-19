/* global require,console */

var _ = require("underscore");
var ent = require("ent");
var fs = require("fs");
var btoa = require("btoa");
var d3 = require("d3");

function templifyPath(url) {
  return _.template(fs.readFileSync(url,{ encoding: "utf-8" }));
}

// various templates for assembling sample files.
var templates = {

  pattern : {
    svg : templifyPath("./src/templates/svg/pattern.html"),
    css: templifyPath("./src/templates/css/pattern.css")
  },

  components: {
    rect: templifyPath("./src/templates/svg/rect.html"),
    div: templifyPath("./src/templates/css/div.html"),
    d3Snippet: templifyPath("./src/templates/d3/d3Snippet.js")
  },

  output: {
    svg: templifyPath("./src/templates/pages/sample_svg.html"),
    css: templifyPath("./src/templates/pages/sample_css.html"),
    d3: templifyPath("./src/templates/pages/sample_d3.html"),
    index: templifyPath("./src/templates/pages/index.html"),
    patterns_css: templifyPath("./src/templates/pages/patterns.css")
  }
};

var root = "./src/patterns/";
var patternGroups = fs.readdirSync(root);
var processingCount = patternGroups.length - 1; //-.DS_Store

// groups of patterns.
var groups = [];
var patternNames = [];

patternGroups.forEach(function(patternGroupName, groupIndex) {

  if (patternGroupName !== ".DS_Store" &&
    fs.lstatSync(root + patternGroupName).isDirectory()) {

    var outputStrings = {
      groupName: /([0-9]+\-)(.+)/.exec(patternGroupName)[2],
      svg: [],
      escapedSVG: [],
      css: [],
      svgSamples: [],
      divSamples: [],
      div: [],
      d3Samples: []
    };

    var patternGroup = fs.readdirSync(root + patternGroupName);
    patternGroup.forEach(function(patternFile, patternIndex) {

      var patternFilePath = root + patternGroupName + "/" + patternFile;
      var patternName = /(.*).svg/.exec(patternFile)[1];
      patternNames.push(patternName);

      var pattern = fs.readFileSync(patternFilePath, { encoding: "utf-8" });

      var b64 = btoa(pattern);
      b64 = "data:image/svg+xml;base64," + b64;

      console.log("Processing " + patternGroupName + ":" + patternName);

      // build template data
      var mockNode = d3.select("body").html(pattern);
      var height = mockNode.select("svg").attr("height");
      var width = mockNode.select("svg").attr("width");

      var data = {
        height: height,
        width: width,
        name: patternName,
        imagedata: b64
      };

      // pattern defs
      outputStrings.svg[patternIndex] = templates.pattern.svg(data);
      data.escapedSVG = ent.encode(outputStrings.svg[patternIndex]);

      // pattern css file
      outputStrings.css[patternIndex] = templates.pattern.css(data);
      data.cssClass = ent.encode(outputStrings.css[patternIndex]);

      // svg pattern using rects
      outputStrings.svgSamples[patternIndex] = templates.components.rect(data);
      // css pattern using divs
      outputStrings.divSamples[patternIndex] = templates.components.div(data);
      // d3 code pattern samples
      outputStrings.d3Samples[patternIndex] = templates.components.d3Snippet(data);

      if (patternIndex + 1 === patternGroup.length) {
        groups.push(outputStrings);
        finish();
      }
    });

  }
});


function writeOutFile(path, contents) {
  fs.writeFileSync(path, contents, {encoding: "utf-8"});
}

function finish() {

  if (!--processingCount) {


    for ( var i = 0; i < groups.length; i++) {
      _.each(groups[i], function(value, key) {
        if (groups[i][key] instanceof Array) {
          groups[i][key] = value.join("");
        }
      });
    }

    console.log("Writing pattern.css");
    writeOutFile("./public/patterns.css", templates.output.patterns_css({
      groups: groups
    }));

    console.log("Writing sample_css.html");
    writeOutFile("./public/sample_css.html", templates.output.css({
      groups: groups // outputStrings.divSamples
    }));

    console.log("Writing sample_svg.html");
    writeOutFile("./public/sample_svg.html", templates.output.svg({
      groups: groups
    }));

    console.log("Writing sample_d3.html");
    writeOutFile("./public/sample_d3.html", templates.output.d3({
      groups: groups,
    }));

    console.log("Writing pattern.css");
    writeOutFile("./public/index.html", templates.output.index({
      patterns: "\"" + patternNames.join("\",\"") + "\""
    }));

  }
}