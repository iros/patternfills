var PatternBuilder = require(__dirname + '/pattern_builder.js');
var PatternsToCSS = require(__dirname + '/output/output_css.js');
var PatternsToSVG = require(__dirname + '/output/output_svg.js');
var PatternsToD3 = require(__dirname + '/output/output_d3.js');
var PatternsToIndex = require(__dirname + '/output/output_index.js');

var builder = new PatternBuilder("src/patterns/");

// build all pattern data.
var patterns = builder.getAllPatternData();

// output sample files
var outputToCss = new PatternsToCSS(patterns);
outputToCss.writePages();

var outputToSvg = new PatternsToSVG(patterns);
outputToSvg.writePages();

var outputToD3 = new PatternsToD3(patterns);
outputToD3.writePages();

var outputToIndex = new PatternsToIndex(patterns);
outputToIndex.writePages();