// A modified version of https://github.com/arslanakram/esbuild-plugin-purgecss-2.0

// Pdfme has a dependency on fontkit (via pdfkit). There is a duplicate key of axisIndex: uint16, in the code. Pull request done - https://github.com/foliojs/fontkit/pull/355. See postprocessFiles() for the work a work round in the `config/bulid/esbuild.js` file


import esbuild from 'esbuild';
import cc from '@apeleghq/esbuild-plugin-closure-compiler';
//import gzipPlugin from '@luncheon/esbuild-plugin-gzip';

export const compile = async () => {
  await esbuild.build({
    entryPoints: ['./dist/app/*.js'],
    bundle: false,
    allowOverwrite: true,
    outdir: './dist/app',
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
  })
}

// If isProd include gzipPlugin. This is pushed into esBuildOpts.plugins because in dev/staging mode the esBuild's write api must be true. But the gzipPlugin requires it to be false.

/*
if (isProd) {
  esbuildOpts.plugins.push(
    gzipPlugin({
      uncompressed: isProd,
      gzip: isProd,
      brotli: isProd,
    })
  );
}
*/
