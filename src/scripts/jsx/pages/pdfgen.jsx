import { generate } from '@pdfme/generator';
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
    window.open(URL.createObjectURL(blob));
    //setInputState(defaultValues); // Reset inputs to default state after pdf generated
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
    <article>
      <h1>{props.heading}</h1>
      <p>
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
  );
}
