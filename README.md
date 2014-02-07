# PatternFills

This is a collection of svg-based pattern fills that can be used both as SVG patterns defs and CSS background image urls. There is also an example of how one might use pattern fills with d3.js. 

A lot of these pattens started from: http://philbit.com/svgpatterns/ which is an amazing project.

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

## How do patterns work?

In this project, we are using patterns in two different ways:

1. Using actual patterns for svg
2. Using base64 encoded strings for css-based fills.

SVG images are typically smaller than bitmap images and remain sharp on high-dpi screens. Unlike CSS3 gradients, SVG images are supported on IE9. (source: http://philbit.com/svgpatterns/#whysvg)

### SVG patterns

To define a pattern that can then be used in svg, one must add it to the defs section of an svg container:

```
<svg height="8" width="8" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <pattern id="crosshatch" patternUnits="userSpaceOnUse" width="8" height="8">
      <image xlink:href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><path fill='#fff' d='M0 0h8v8h-8z'/><path d='M0 0l8 8zm8 0l-8 8z' stroke-width='.5' stroke='#aaa'/></svg>" x="0" y="0" width="8" height="8">
      </image>
    </pattern>
  </defs>
</svg>
```

Important parts to note about this section are:
1. The pattern id string

To use the pattern to color in some svg element, like a rect, simply set the style attribute `fill` to the string: `url(#patternName) #fallbackcolor`. For example:

```
<svg height="150" width="150" style="float:left">
  <rect style="fill: url(#crosshatch) #fff;" x="0" y="0" height="150" width="150">
  </rec>
</svg>
```

### CSS patterns

Css patterns utilize image fills. For exmple, the following is a definition of one of our patterns, converted to base64 string and turned into a css class definition:

```
.crosshatch {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><path fill='#fff' d='M0 0h8v8h-8z'/><path d='M0 0l8 8zm8 0l-8 8z' stroke-width='.5' stroke='#aaa'/></svg>");
  background-repeat: repeat;
}
```

Then simply use the class name:

```
<div style="width: 150px; height: 150px; float:left" class="crosshatch">
</div>
```

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
