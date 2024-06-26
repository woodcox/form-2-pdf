import { generate } from '@pdfme/generator';
import TablePdf from './tablepdf.jsx';
import { template, setTemplate } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';
const pathPrefix = process.env.PATHPREFIX;
let urlPrefix = pathPrefix ? `/${pathPrefix}` : '';

export default function PdfmeGenerator() {
  async function generatePdf() {
    console.log(template());
    console.log(pdfState);

    const pdf = await generate({
      template: template(), // using signals
      inputs: [pdfState], // using state
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);
    //window.open(URL.createObjectURL(blob));
    //setInputState(defaultValues); // Reset inputs to default state after pdf generated

    // Check if a mobile device
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Mobi|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Check if the mobile device supports the web share API the navigator.share is used to open the Web Share API. This invokes the native share mechanism of the device and allows users to share text, URLs or files.
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Ceremony Options PDF',
            text: 'The ceremony options PDF.',
            files: [
              new File([blob], 'ceremony-options.pdf', {
                type: 'application/pdf',
              }),
            ],
          });
        } catch (error) {
          console.log('Error sharing', error);
        }
      } else {
        // FALLBACK - If the mobile device does not support the web share API, the pdf is created in a new tab.
        window.open(pdfUrl);
      }
    } else {
      // FALLBACK - If the device is not a mobile device the pdf is created in a new tab
      window.open(pdfUrl);
    }
  }

  return (
    <>
      <CreatePdf
        heading="Ceremony options pdf"
        generatePdf={generatePdf}
        prevPage="/summary"
        cancel="/"
      />
    </>
  );
}

function CreatePdf(props) {
  // Add urlPrefix to navigation links
  const prevPagePrefix = `${urlPrefix}${props.prevPage}`;
  const cancelPagePrefix = `${urlPrefix}${props.cancel}`;
  return (
    <>
      <article>
        <h1 class="govuk-heading-l">{props.heading}</h1>
        <p class="govuk-body">
          Please generate your ceremony options. This will create a pdf. Please
          save the pdf and then email it to ....
        </p>
        <nav class="govuk-button-group">
          <a
            role="button"
            draggable="false"
            class="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            href={prevPagePrefix}
          >
            Back
          </a>
          <button
            role="button"
            draggable="false"
            class="govuk-button"
            data-module="govuk-button"
            type="reset"
            onClick={props.generatePdf}
          >
            Create PDF
          </button>
          <a
            role="button"
            draggable="false"
            class="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            href={cancelPagePrefix}
          >
            Cancel
          </a>
        </nav>
      </article>
      <TablePdf />
    </>
  );
}
