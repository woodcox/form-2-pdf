/**
 * Configures Eleventy with various settings, collections, plugins, filters, shortcodes, and more.
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

import sass from "sass";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { solidShortcode } from './config/shortcodes/solidify.js';
import { esbuildPipeline } from './config/build/esbuild.js';
import { purgecssPipeline } from './config/build/purgecss.js';
import path from "path";
const now = String(Date.now());
const isProd = process.env.ELEVENTY_ENV === 'prod' ? true : false;
const TEMPLATE_ENGINE = "liquid";

// Currently Stackblitz does not like Import attributes. Hopefully will be able to write the following soon:
//import manifest from './src/_data/manifest.json' with { "type": "json" };
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const manifest = require('./src/_data/manifest.json');



export default async function (eleventyConfig) {
  // DEV SERVER
  eleventyConfig.setServerOptions({
    port: 8080,
    //watch: ["dist/app/*.css"], // sass is watching the scss (see package.json) & esbuild will incrementally rebuild on change
    liveReload: true,
    domDiff: true,
  });
  
  // WATCH
  eleventyConfig.addWatchTarget("./src/");

  eleventyConfig.watchIgnores.add("./src/_data/manifest.json");
  eleventyConfig.watchIgnores.add("./src/_data/buildmeta.json");
  eleventyConfig.watchIgnores.add("./src/style/**"); // Sass is watching for changes already

  eleventyConfig.setWatchThrottleWaitTime(300); // in millisecons slow the rebuild

  // BUILD HOOK
  eleventyConfig.on("eleventy.before", esbuildPipeline);
  if (isProd){
    eleventyConfig.on("eleventy.after", purgecssPipeline);
  };

  // PLUGINS
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_includes/components/*.webc",
  });
  // to use other templates like liquid and nunjunks
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // SHORTCODES & FILTERS
  // Add cache busting by using {{ 'myurl' | version }}
  eleventyConfig.addFilter("version", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    params.set("v", `${now}`);
    return `${urlPart}?${params}`;
  });
  
  // Use this filter only if the asset is processed by esbuild and is in _data/manifest.json. Use {{ 'myurl' | hash }}
  eleventyConfig.addFilter("hash", (url) => {
    const urlbase = path.basename(url);
    const [basePart, ...paramPart] = urlbase.split(".");
    const urldir = path.dirname(url);
    let hashedBasename = manifest[basePart];
    return `${urldir}/${hashedBasename}`;
  });

  /* Use filter to resolve promises from async functions. No more [object Promise] in your templates. {{ myAsyncFunction() | await }} */
  eleventyConfig.addFilter("await", async promise => {
    return promise;
  });

  eleventyConfig.addPairedShortcode("solid", solidShortcode);
 
  // Let Eleventy transform HTML files as liquidjs
  // So that we can use .html instead of .liquid

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data",
    },
    templateFormats: ["html", "md", TEMPLATE_ENGINE],
    markdownTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
  };
};
