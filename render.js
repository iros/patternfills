/* global require,console */

var d3 = require("d3");
var _ = require("underscore");
var fs = require("fs");
var btoa = require("btoa");

function templifyPath(url) {
  return _.template(fs.readFileSync(url,{ encoding: "utf-8" }));
}

// pattern names. all files must be called patternName.svg in the patterns
// directory under src.
var patterns = fs.readdirSync("./src/patterns");

// various templates for assembling sample files.
var templates = {

  pattern : {
    html : templifyPath("./src/templates/pattern.html"),
    css: templifyPath("./src/templates/pattern.css")
  },

  components: {
    rect: templifyPath("./src/templates/rect.html"),
    div: templifyPath("./src/templates/div.html"),
    d3Snippet: templifyPath("./src/templates/d3Snippet.js")
  },

  output: {
    svg: templifyPath("./src/templates/sample_svg.html"),
    css: templifyPath("./src/templates/sample_css.html"),
    d3: templifyPath("./src/templates/sample_d3.html")
  }
};

var outputStrings = {
  svg: "", css: "", svgSamples: "", divSamples: "", div: "", d3Samples: ""
};

for(var i = 0; i < patterns.length; i++) {

  var patternFile = patterns[i];
  var patternFilePath = "./src/patterns/" + patternFile;
  var patternName = /(.*).svg/.exec(patternFile)[1];

  console.log("Processing " + patternName);

  var pattern = fs.readFileSync(patternFilePath, { encoding: "utf-8" });

  // make base64 string of inner html
  var b64 = btoa(pattern);

  // make url string
  b64 = "data:image/svg+xml;base64," + b64;

  // find dimensions
  var mockNode = d3.select("body").html(pattern);
  var height = mockNode.select("svg").attr("height");
  var width = mockNode.select("svg").attr("width");

  // build template data
  var data = {
    height: height,
    width: width,
    name: patternName,
    imagedata: b64
  };

  // pattern defs
  outputStrings.svg += templates.pattern.html(data);
  // pattern css file
  outputStrings.css += templates.pattern.css(data);
  // svg pattern using rects
  outputStrings.svgSamples += templates.components.rect(data);
  // css pattern using divs
  outputStrings.divSamples += templates.components.div(data);
  // d3 code pattern samples
  outputStrings.d3Samples += templates.components.d3Snippet(data);
}

function writeOutFile(path, contents) {
  fs.writeFileSync(path, contents, {encoding: "utf-8"});
}

console.log("Writing pattern.css");
writeOutFile("./build/patterns.css", outputStrings.css);

console.log("Writing sample_css.html");
writeOutFile("./build/sample_css.html", templates.output.css({
  samples: outputStrings.divSamples
}));

console.log("Writing sample_svg.html");
writeOutFile("./build/sample_svg.html", templates.output.svg({
  patterns: outputStrings.svg,
  samples: outputStrings.svgSamples
}));

console.log("Writing sample_d3.html");
writeOutFile("./build/sample_d3.html", templates.output.d3({
  patterns: outputStrings.svg,
  d3Script: outputStrings.d3Samples
}));