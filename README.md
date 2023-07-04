# Form to Pdf Generator using pdfMe and SolidJS 
Using:
  - [pdfMe](https://pdfme.com)
  - [Solid-js](https://solidjs.com)
  - [esBuild](https://esbuild.github.io)
  - [11ty](http://11ty.dev)
    
## Compile Solidjs to js
Add `your_solid.jsx` file to the `src/scripts/jsx` or the `src/scripts/js` folders. Esbuild will output a minified js file. To configure esbuild modify `config/build/esbuild.js`. The `jsx` app entry point is configured to `render.jsx`. But you may wish to change this.

## Shortcode
If you need to compile your js script inline, use this shortcode:

~~~liquid
{% solid "filename", "bundled" %}
  your.solid.jsx.code
{% endsolid %}
~~~

The shortcode will generate a module script tag. 

~~~html
<script type="module">your.es6.js.code</script>
~~~

### Arguments
There are two optional arguments:
- `filename`: The name of the file which is saved to `dist/app`. This name is automatically prefixed by `solid-`.
- `bundled`: The solid.jsx is bundled by default. To switch bundling off pass the value: `"bundleOff"`.

## SolidJS configuration
To configure esbuild for js/jsx files modify `config/build/esbuild.js` or to configure the shortcode, modify `config/shortcode/solidify.js`. For further info check out the [esbuild-plugin-solid](https://github.com/amoutonbrady/esbuild-plugin-solid) github repo by [amoutonbrady](https://amoutonbrady.dev/).

## Cachebusting hash filter

Esbuild is configured to add a hash to the CSS and JS files it processes in the `src/scripts/jsx`, `src/scripts/js` and the `dist/app/css` folders (it purges the prefixed output of the scss in situ). It outputs a `manifest.json` file to the `src/_data` directory.
The manifest.json file is used in the hash filter to modify the URL src or href in the html:

~~~html
<script src="{{ '/app/app.js' | hash }}"></script>
<link rel="stylesheet" href="{{ '/app/style.css' | hash }}" />
~~~

As a bonus if the file has been minified in production it will alter the file extension to `[hash]-min.js` or `[hash]-min.css`, for example:

~~~html
<script src="/app/app-S5YUTCHU.min.js"></script>
~~~

## Purgecss
Your css files will be automatically purged of unused css in production. To configure the purgecssPlugin modify the `config/build/purgecss.js` file. You can use any configuration pattern from [purgecss](https://purgecss.com/configuration.html), but you don't need to set the `css:` options as this is automatically included from the buildmeta.json.

~~~js
plugins: [
  ...
  purgecssPlugin({
    content: ["dist/index.html"]
   }),
 ]
 ~~~

## Development Scripts

**`npm start`**

> Run 11ty with hot reload at localhost:8080, including reload based on Sass and JS changes.

**`npm run cloud`**

> Development build for use on cloud IDE's such as [Stackblitz](https://stackblitz.com/) without the pathprefix of /11ty-solid-base/. The CSS is autoprefixed but no minification or purging happens.

If your using [Stackblitz](https://stackblitz.com/). To start the cloud dev server run: `npm run cloud` then `npm run start`.

**`npm run build`**

> Staging build with autoprefixed CSS but no minification or purging. 

**`npm run minify`**

> Production build includes minified, autoprefixed and purged CSS

Use this as the "Publish command" if needed by hosting such as Netlify.
