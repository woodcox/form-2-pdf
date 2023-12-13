import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import PdfmeGenerator from './pdfgen.jsx';

render(
    () => (
        <Router>
            <PdfmeGenerator />
        </Router>
    ), 
    document.getElementById('pdfapp')
);
