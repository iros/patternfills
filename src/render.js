/* global require,console */

var _ = require("underscore");
var fs = require("fs");
var SVGO = require("svgo");
var svgo = new SVGO({
  convertStyleToAttrs: true,
  js2svg: {
    attrStart: "='",
    attrEnd: "'"
  }
});

function templifyPath(url) {
  return _.template(fs.readFileSync(url,{ encoding: "utf-8" }));
}

// pattern names. all files must be called patternName.svg in the patterns
// directory under src.
var patterns = fs.readdirSync("./src/patterns");

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

var outputStrings = {
  svg: [],
  css: [],
  svgSamples: [],
  divSamples: [],
  div: [],
  d3Samples: []
};

var processingCount = patterns.length;

patterns.forEach(function(patternFile, patternIndex) {
  var patternFilePath = "./src/patterns/" + patternFile;
  var patternName = /(.*).svg/.exec(patternFile)[1];

  console.log("Processing " + patternName);

  var pattern = fs.readFileSync(patternFilePath, { encoding: "utf-8" });

  svgo.optimize(pattern, function(optimized) {
    // build template data
    var data = {
      height: optimized.info.height,
      width: optimized.info.width,
      name: patternName,
      imagedata: "data:image/svg+xml," + optimized.data
    };

    // pattern defs
    outputStrings.svg[patternIndex] = templates.pattern.svg(data);
    // pattern css file
    outputStrings.css[patternIndex] = templates.pattern.css(data);
    // svg pattern using rects
    outputStrings.svgSamples[patternIndex] = templates.components.rect(data);
    // css pattern using divs
    outputStrings.divSamples[patternIndex] = templates.components.div(data);
    // d3 code pattern samples
    outputStrings.d3Samples[patternIndex] = templates.components.d3Snippet(data);
    finish();
  });
});

function finish() {
  if (!--processingCount) {
    _.each(outputStrings, function(value, key) {
      outputStrings[key] = value.join("");
    });

    console.log("Writing pattern.css");
    writeOutFile("./public/patterns.css", templates.output.patterns_css({
      patterns: outputStrings.css
    }));

    console.log("Writing sample_css.html");
    writeOutFile("./public/sample_css.html", templates.output.css({
      samples: outputStrings.divSamples
    }));

    console.log("Writing sample_svg.html");
    writeOutFile("./public/sample_svg.html", templates.output.svg({
      patterns: outputStrings.svg,
      samples: outputStrings.svgSamples
    }));

    console.log("Writing sample_d3.html");
    writeOutFile("./public/sample_d3.html", templates.output.d3({
      patterns: outputStrings.svg,
      d3Script: outputStrings.d3Samples
    }));

    console.log("Writing pattern.css");
    writeOutFile("./public/index.html", templates.output.index());

  }
}

function writeOutFile(path, contents) {
  fs.writeFileSync(path, contents, {encoding: "utf-8"});
}

