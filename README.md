# d3-patternfills

This is a collection of svg-based pattern fills that can be used both as SVG patterns defs and CSS background image urls.

## Project structure:

All the patterns live under `src/patterns`. Each file is a single svg file containing the pattern itself and nothing else.

To view any of the patterns, one must build the sample files. There are three of them that are created:

* `build/sample_svg.html` - a raw sample of using the pattens within SVG.
* `build/sample_css.html` - a sample of using the patterns after they are converted to css image urls. See the accompanying `pattern.css`.
* `build/sample_d3.html` - a sample of d3 code that generates the same exact output that `sample_svg.html` does, but using d3.js.

## Building sample files:

To build the sample files, first setup your dev environment:

`npm install`

Then run the render task:

`grunt render` or simply `grunt`.

The files will be built and put into the `build` folder. If you don't intend to customize the patterns or add new ones, you can simply look at the generated code and use it for your own needs.

## Modifying/Adding patterns

First, set up your development environemnt, if you haven't already:

`npm install`

Then open two terminal windows, both at the root of this repository. From one, run:

`grunt watch` - this will watch for any changes under the `src` directory and rebuild the sample files

From the other run:

`grunt connect` - this will fire up a server on localhost running on port 8000. Navigate to that url to one of the sample files you wish to see (http://localhost:8000/sample_svg.html, http://localhost:8000/sample_d3.html or http://localhost:8000/sample_css.html).

The project is setup with live reloading, so that any time you modify any of the pattern files you will see your page automatically reload.

## Submitting patterns

Ideally, this pattern library will grow and contain many new patterns! Please submit yours in a pull request and I will be more than happy to merge them if they work appropriatly.

Currently our patterns are:

![patterns](http://gyazo.com/0888bddacd77e634a78bf7097dc4df31.png "patterns")

Thanks
- @iros.
