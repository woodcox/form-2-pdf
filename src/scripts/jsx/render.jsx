import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import Intro from './pages/intro.jsx';
import YourDetails from './pages/yourDetails.jsx';
import YourPartner from './pages/yourPartner.jsx';
import PdfmeGenerator from './pages/pdfgen.jsx';
/* this accesses the environment variable PATHPREFIX set by the npm scripts (in the package.json) which is passed to solid-js by esbuild.js. Esbuild defines the environmental variables to pass through to solid-js app.*/
const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : "";

console.log('pathPrefix:', pathPrefix);
console.log('urlPrefix:', urlPrefix);

render(
    () => (
        <Router>
            <Route path={urlPrefix}> {/* solid-js router uses urlPrefix here to set the url path */}
                <Route path="/" component={Intro} /> {/* Define the home page route */}
                <Route path="/your-details" component={YourDetails} />
                <Route path="/partner" component={YourPartner} />
                <Route path="/pdf" component={PdfmeGenerator} />
            </Route>
        </Router>
    ), 
    document.getElementById('pdfapp')
);
