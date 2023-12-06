// https://www.seancdavis.com/posts/javascript-for-11ty-with-esbuild/
const esbuild = require('esbuild');
const glob = require('glob-all'); // to enable * glob pattern in esbuild
const isProd = process.env.ELEVENTY_ENV === 'prod' ? true : false;
const isDev = process.env.ELEVENTY_ENV === 'dev' ? true : false;
const { solidPlugin } = require('esbuild-plugin-solid');
const manifestPlugin = require('esbuild-plugin-manifest');
const gzipPlugin = require('@luncheon/esbuild-plugin-gzip');
const { http, default_schemes } = require('@hyrious/esbuild-plugin-http');
// cacheMap stores { url => contents }, you can easily persist it in file system - see https://github.com/hyrious/esbuild-plugin-http
let cacheMap = new Map();
const fs = require('fs');
const path = require("path");

const esbuildOpts = {
  entryPoints: glob.sync(['src/scripts/jsx/render.jsx', 'src/scripts/js/*.js', 'dist/app/*.css']), // include css so that its in the manifest.json
  entryNames: isProd ? '[name]-[hash]' : '[name]',
  outExtension: isProd ? {'.js': '.min.js', '.css': '.min.css'} : {'.js': '.js', '.css': '.css'},
  allowOverwrite: !isProd,  // overwrite dist/app/style.css when in dev mode
  bundle: true,
  minify: isProd,
  write: !isProd,  // this is required for the gzipPlugin to work
  treeShaking: isProd,
  outdir: './dist/app',
  sourcemap: !isProd,
  target: isProd ? 'es6' : 'esnext',
  metafile: true,
  plugins: [
    // To run development/staging build (skips purgingcss) if isProd = false when ELEVENTY_ENV != 'prod'. 
    // This is implimented in the package.json scripts
    http({
      filter: (url) => true,
      schemes: { default_schemes },
      cache: cacheMap
    }),
    solidPlugin(),
    gzipPlugin({
      uncompressed: !isProd,
      gzip: isProd
    }),
    manifestPlugin({
      // NOTE: Save to src/_data. This is always relative to `outdir`.
      filename: '../../src/_data/manifest.json',
      useEntrypointKeys: true,
      shortNames: true,
      extensionless: 'input',
      // Generate manifest.json - https://github.com/pellebjerkestrand/pokesite/blob/main/source/build/build-client.js
      generate: (entries) =>
        Object.fromEntries(
          Object.entries(entries).map(([from, to]) => [
            from,
            `${path.basename(to)}`,
          ])
        ),
      })
  ]
}

// If isProd include gzipPlugin. This is pushed into esBuildOpts.plugins because in dev/staging mode the esBuild's write api must be true. But the gzipPlugin requires it to be false.
if (isProd) {
  esbuildOpts.plugins.push(gzipPlugin({
    uncompressed: !isProd,
    gzip: isProd,
    brotli: isProd,
  }));
}

module.exports = async () => {
  let ctx = await esbuild.context({
    ...esbuildOpts,
  }).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  if (isDev === true){
    // Enable watch mode - NOTE buildmeta.json is not generated when watching
    // Need to limit esbuild so only watching js & jsx
    await ctx.watch();
    console.log("[esbuild] is watching for changes...");
  } else {
    // Build once and exit if not watch mode
    await ctx.rebuild().then(result => {
      ctx.dispose();
      fs.writeFileSync('./src/_data/buildmeta.json', JSON.stringify(result.metafile));
    })
  }
}
