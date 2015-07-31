var PatternBuilder = require('./pattern_builder');
var PatternsToCSS = require('./output/output_css');
var PatternsToSVG = require('./output/output_svg');
var PatternsToD3 = require('./output/output_d3');
var PatternsToIndex = require('./output/output_index');

// determine colors
var background = 'white';
var foreground = 'black';

if (process.argv[2] !== 'undefined') {
  background =  process.argv[2];
}

if (process.argv[3] !== 'undefined') {
  foreground =  process.argv[3];
}

var builder = new PatternBuilder("src/patterns/", {
  background: background, foreground: foreground
});

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