import esbuild from "esbuild";
const isProd = process.env.ELEVENTY_ENV === 'prod' ? true : false
import { solidPlugin } from 'esbuild-plugin-solid';
import { default as fsWithCallbacks } from 'fs';
const fsPromises = fsWithCallbacks.promises;
import { http, default_schemes } from '@hyrious/esbuild-plugin-http';

export const solidShortcode = async (code, filename, bundled) => {
  let bundleJsx = bundled !== 'bundleOff' ? true : false;
  await fsPromises.writeFile('./_tmp/solid-' + filename + '.jsx', code),
  
  await esbuild.build({
    entryPoints: ['_tmp/solid-*.jsx'],
    entryNames: '[name]',
    // write: false,
    outdir: './_tmp/app',
    bundle: bundleJsx,
    format: 'esm',
    minify: isProd,
    treeShaking: isProd,
    target: isProd ? 'es6' : 'esnext',
    plugins: [
      http({
        filter: (url) => true,
        schemes: { default_schemes },
        cache: new Map()
      }),
      solidPlugin()
    ]
  }).catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  const solidifyJsx = await fsPromises.readFile('./_tmp/app/solid-' + filename + '.js', 'utf8');
  return `<script type="module">${solidifyJsx}</script>`;
};
