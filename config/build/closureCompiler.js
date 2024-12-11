// A modified version of https://github.com/arslanakram/esbuild-plugin-purgecss-2.0
import esbuild from 'esbuild';
import cc from '@apeleghq/esbuild-plugin-closure-compiler';

export const closureCompiler = async () => {
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
