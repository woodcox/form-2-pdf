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
  environment: process.env.ELEVENTY_ENV,
  pathToSvgLogo: 'src/assets/svg/misc/logo.svg', // used for favicon generation
  themeColor: '#DD4462', //  Manifest: defines the default theme color for the application
  themeBgColor: '#FBFBFB', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  opengraph_default: '/assets/images/template/opengraph-default.jpg', // fallback/default meta image
  opengraph_default_alt:
  "Visible content: A progressive web app made with 11ty and Solid JS" // alt text for default meta image"
}

export default meta;
