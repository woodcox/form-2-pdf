// https://www.seancdavis.com/posts/javascript-for-11ty-with-esbuild/
import esbuild from 'esbuild';
//const glob = require('glob-all'); // to enable * glob pattern in esbuild
const isProd = process.env.ELEVENTY_ENV === 'prod' ? true : false;
const isDev = process.env.ELEVENTY_ENV === 'dev' ? true : false;
import { solidPlugin } from 'esbuild-plugin-solid';
import manifestPlugin from 'esbuild-plugin-manifest';
import gzipPlugin from '@luncheon/esbuild-plugin-gzip';
//import cc from '@apeleghq/esbuild-plugin-closure-compiler';
import { http, default_schemes } from '@hyrious/esbuild-plugin-http';
// cacheMap stores { url => contents }, you can easily persist it in file system - see https://github.com/hyrious/esbuild-plugin-http
let cacheMap = new Map();
import fs from 'fs';
import path from 'path';

// Get arguments from npm script (such as --pathprefix) - https://reflect.run/articles/sending-command-line-arguments-to-an-npm-script/
const parseArgs = (args) => {
  const parsedArgs = {};

  args.forEach((arg) => {
    const parts = arg.split('=');

    parsedArgs[parts[0].slice(2)] = parts[1];
  });

  return parsedArgs;
};

const npmScriptArgs = parseArgs(process.argv);

// pathPrefix and defineEnv const's access the environment variable PATHPREFIX set by the npm scripts (in the package.json) which is passed to solid-js by esbuild.js. Esbuild defines the environmental variables to pass through to solid-js app using the define config.
const pathPrefix = npmScriptArgs.pathprefix || '';

const defineEnv = {
  'process.env.PATHPREFIX': JSON.stringify(pathPrefix),
  // Add other environment variables as needed
};

const esbuildOpts = {
  entryPoints: [
    'src/scripts/jsx/app.jsx',
    'src/scripts/js/*.js',
    'dist/app/*.css',
  ], // include css so that its in the manifest.json
  entryNames: isProd ? '[name]-[hash]' : '[name]',
  outExtension: isProd
    ? { '.js': '.min.js', '.css': '.min.css' }
    : { '.js': '.js', '.css': '.css' },
  allowOverwrite: !isProd, // overwrite dist/app/style.css when in dev mode
  bundle: true,
  minify: isProd,
  write: !isProd, // this is required for the gzipPlugin to work
  treeShaking: isProd,
  outdir: './dist/app',
  sourcemap: !isProd,
  target: isProd ? 'es6' : 'esnext',
  metafile: true,
  define: defineEnv,
  //
  loader: {
    '.png': 'dataurl',
    '.woff': 'dataurl',
    '.woff2': 'dataurl',
    '.eot': 'dataurl',
    '.ttf': 'dataurl',
    '.svg': 'dataurl',
  },
  plugins: [
    // To run development/staging build (skips purgingcss) if isProd = false when ELEVENTY_ENV != 'prod'.
    // This is implimented in the package.json scripts
    http({
      filter: (url) => true,
      schemes: { default_schemes },
      cache: cacheMap,
    }),
    solidPlugin(),
    manifestPlugin({
      // NOTE: Save to src/_data. This is always relative to `outdir`.
      filename: '../../src/_data/manifest.json',
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
    }),
  ],
};

// If isProd include gzipPlugin. This is pushed into esBuildOpts.plugins because in dev/staging mode the esBuild's write api must be true. But the gzipPlugin requires it to be false.
if (isProd) {
  esbuildOpts.plugins.push(
    gzipPlugin({
      uncompressed: isProd,
      gzip: isProd,
      brotli: isProd,
    })
  );
}

/*
async function runClosureCompiler() {
  await esbuild.build({
    entryPoints: ['./dist/app/*.js'],
    bundle: false,
    allowOverwrite: true,
    plugins: [
      cc({
        language_in: 'ECMASCRIPT_NEXT',
        language_out: 'ECMASCRIPT_NEXT',
        compilation_level: 'ADVANCED',
        warning_level: 'QUIET',
        js: ['dist/app/*.js', '!dist/app/is-land-*.min.js', '!dist/app/is-land.js'],
        externs: 'config/build/externs.js',
      }),
    ],
    outdir: './dist/app',
  });
} */

export const esbuildPipeline = async () => {

  // ============================================
  // WORKAROUND FOR CLOSURE COMPILER START 1 of 2
  // ============================================
  // Pdfme has a dependency on fontkit (via pdfkit). There is a duplicate key of axisIndex: uint16, in the code. Pull request done - https://github.com/foliojs/fontkit/pull/355. See postprocessFiles() for the work a work round.
  // Preprocess dependency files to remove duplicate keys
  const postprocessFiles = () => {
    const dependencyFiles = ['dist/app/app.js', 'dist/app/app-*.js']; // Add all relevant files to this array
    dependencyFiles.forEach((filePath) => {
      try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove duplicate keys in object literals
        content = content.replace(
          /(axisIndex:\s*uint16,)(\s*axisIndex:\s*uint16,)+/g,
          '$1' // Retain only the first occurrence
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed ${filePath} to remove duplicate keys.`);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    });
  };
  // ============================================
  // WORKAROUND FOR CLOSURE COMPILER END 1 of 2
  // ============================================

  let ctx = await esbuild
    .context({
      ...esbuildOpts,
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
  if (isDev === true) {
    // Enable rebuild when 11ty in watch mode - NOTE buildmeta.json is not generated when watching
    await ctx.rebuild(); // Use 11ty to watch and esbuild to rebuild incrementally
    console.log('[esbuild] will rebuild when 11ty detects a change...');
  } else {
    // Build once and exit if not watch mode
    await ctx.rebuild().then((result) => {
      ctx.dispose();
      fs.writeFileSync(
        './src/_data/buildmeta.json',
        JSON.stringify(result.metafile)
      );

      // ============================================
      // WORKAROUND FOR CLOSURE COMPILER START 2 of 2
      // ============================================
      // Run the post-process step
      console.log('[esbuild] Build complete. Starting post-processing...');
      postprocessFiles();
      // ============================================
      // WORKAROUND FOR CLOSURE COMPILER END 2 of 2
      // ============================================
    });
  }
};
