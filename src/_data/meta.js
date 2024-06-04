// See - https://www.aleksandrhovhannisyan.com/blog/useful-11ty-filters/#4-absolute-urls

const isProd = process.env.ELEVENTY_ENV === 'prod' ? true : false;
const isDev = process.env.ELEVENTY_ENV === 'dev' ? true : false;
const pathPrefix = process.env.PATHPREFIX || ''; // default '' unless PATHPREFIX defined in npm script
const myPort = process.env.PORT || '8080'; // default to 8080 unless PORT defined in npm script
const baseUrl = 'https://www.woodcox.github.io'; // Your site url

const absoluteUrl = isDev ? `http://localhost:${myPort}` : `${baseUrl}/${pathPrefix}`;

const meta = {
  title: 'Your site title',
  description: 'Your site description',
  absoluteUrl,
  baseUrl,
  pathPrefix,
  environment: process.env.ELEVENTY_ENV
}

export default meta;
