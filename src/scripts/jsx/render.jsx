import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import PdfmeGenerator from './pdfgen.jsx';
import yourName from './yourName.jsx';
import yourPartner from './yourPartner.jsx';
/* this accesses the environment variable PATHPREFIX set by the npm scripts (in the package.json) which is passed to solid-js by esbuild.js. Esbuild defines the environmental variables to pass through to solid-js app.*/
const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : "";


console.log('pathPrefix:', pathPrefix);
console.log('urlPrefix:', urlPrefix);
render(
    () => (
        <Router>
            <Route path={urlPrefix}> {/* solid-js router uses urlPrefix here to set the url path */}
                <Route path="/" component={PdfmeGenerator} /> {/* Define the home page route */}
                <Route path="/name" component={yourName} /> 
                <Route path="/partner" component={yourPartner} />
            </Route>
        </Router>
    ), 
    document.getElementById('pdfapp')
);
