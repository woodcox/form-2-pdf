// A modified version of https://github.com/arslanakram/esbuild-plugin-purgecss-2.0
import esbuild from 'esbuild';
//const glob = require('glob-all');
import fs from 'fs';
import { PurgeCSS } from 'purgecss';
import path from 'path';
const buildMetafile = JSON.parse(fs.readFileSync('./src/_data/buildmeta.json', 'utf8'));

let purgecssPlugin = function purgecssPlugin(options) {
  return {
    name: 'purgecss',
    setup(build) {
      if (!buildMetafile) {
        throw new Error('Make sure eleventy generates a buildmeta.json from .src/config/build/esbuild.js');
      }

      build.onEnd(async (args) => {
        path: args.path;
        // outputKeyss gets metafile build output of .js files and .css files
        const outputKeys = Object.keys(buildMetafile.outputs);
        console.log(outputKeys);
        // create a file extension filter 
        const genFilter = (postfix) => (k) => k.endsWith(postfix);
        // filter the metafile output to only return the css files
        const css = outputKeys.filter(genFilter('.css'));
      
        // Create a jS object of the purgecss config for css
        let cssConfig = { css: css };
        // Merge the css config with the purgecssPlugin options
        let config = Object.assign(options, cssConfig);

        // check if there is the purgecss config js object and throw error if not
        const opts = config ? config : () => {};
        
        // pass the purgecss config including the relevant css file to purgecss
        const purgeResult = await new PurgeCSS().purge({ ...opts });

        for (let index = 0; index < purgeResult.length; index++) {
          const { file, css } = purgeResult[index];
          await fs.promises.writeFile(file, css);
        }
      });
    },
  };
};

export const purgecssPipeline = async () => {
  let result = await esbuild.build({
    entryPoints: ['dist/app/*.css'],
    allowOverwrite: true,
    minify: true,
    outdir: './dist/app',
    plugins: [
      purgecssPlugin({
        // For your production build. Add other content by using a glob-all pattern glob.sync(["dist/*.html", "dist/**/index.html"])
        content: ["src/scripts/jsx/*.jsx", "src/scripts/jsx/**/*.jsx", "dist/index.html"]
      })
    ]
  })
};
