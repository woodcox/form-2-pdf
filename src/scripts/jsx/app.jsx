import { render } from 'solid-js/web';
import { Router, Route, Navigate } from '@solidjs/router';
import Intro from './pages/intro.jsx';
import YourDetails from './pages/yourDetails.jsx';
import YourPartner from './pages/yourPartner.jsx';
import Booking from './pages/booking.jsx';
import Vows from './pages/vows.jsx';
import Ceremony from './pages/ceremony.jsx';
import Witness from './pages/witness.jsx';
import YourParents from './pages/yourParents.jsx';
import PartnerParents from './pages/partnerParents.jsx';
import Music from './pages/music.jsx';
import Summary from './pages/summary.jsx';
import PdfmeGenerator from './pages/pdfgen.jsx';
/* Use the environment variable PATHPREFIX. This is set by the npm scripts (in the package.json) which is passed to solid-js by the esbuild config - `define:`. 
Esbuild defines the environmental variables to pass through to solid-js app.*/
const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : "";

render(
    () => (
        <Router>
            <Route path={urlPrefix}> {/* solid-js router uses urlPrefix here to set the base url path */}
                <Route path="/" component={Intro} /> {/* The home page route */}
                <Route path="/your-details/" component={YourDetails} />
                <Route path="/partner/" component={YourPartner} />
                <Route path="/booking/" component={Booking} />
                <Route path="/vows/" component={Vows} />
                <Route path="/ceremony/" component={Ceremony} />
                <Route path="/witness/" component={Witness} />
                <Route path="/your-parents/" component={YourParents} />
                <Route path="/partner-parents/" component={PartnerParents} />
                <Route path="/music/" component={Music} />
                <Route path="/summary/" component={Summary} />
                <Route path="/pdf/" component={PdfmeGenerator} />
                <Route path="/redirect/" component={() => <Navigate href="/" />} /> {/* Redirects need to be set up in deployed environments */}
            </Route>
        </Router>
    ), 
    document.getElementById('pdfapp')
);
