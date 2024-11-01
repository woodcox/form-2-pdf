import { createMemo } from 'solid-js';
import { table, text, image, line } from '@pdfme/schemas';
import { generate } from '@pdfme/generator';
import { templateSchema } from './../pdfme/templateSchema.js';
//import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState } from './../pdfme/pdfDefaultValues.jsx';

/*const inputs = [
  {
    ceremonyOptions: JSON.stringify([
      ['Alice', 'Alice is a freelance web designer and developer'],
      ['Bob', 'Bob is a freelance illustrator and graphic designer'],
      ['James', 'James is a frontend developer'],
    ]),
  },
];
*/

const pathPrefix = process.env.PATHPREFIX;
let urlPrefix = pathPrefix ? `/${pathPrefix}` : '';

export default function TablePdf() {

  const inputs = createMemo(() => [
    {
      ceremonyOptions: JSON.stringify(
        Object.entries(pdfState)
          .filter(([key, value]) => value !== '')
          .map(([key, value]) => [key, value])
      ),
    },
  ]);

  async function generatePdf() {
    //console.log(pdfState);

    const pdf = await generate({
      template: templateSchema, // this is static with the pdfme v4 dynamic tables
      plugins: { text, image, line, Table: table }, // add the pdfme plugin schemas
      inputs: inputs(), // [pdfState], using state
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
    //setInputState(defaultValues); // Reset inputs to default state after pdf generated
  }

  return (
    <>
      <CreateTablePdf heading="Testing tables" generatePdf={generatePdf} />
    </>
  );
}

function CreateTablePdf(props) {
  // Add urlPrefix to navigation links
  const prevPagePrefix = `${urlPrefix}${props.prevPage}`;
  const cancelPagePrefix = `${urlPrefix}${props.cancel}`;
  return (
    <article>
      <h1 class="govuk-heading-l">{props.heading}</h1>
      <p class="govuk-body">Testing dynamic tables</p>
      <nav class="govuk-button-group">
        <button
          role="button"
          draggable="false"
          class="govuk-button"
          data-module="govuk-button"
          type="reset"
          onClick={props.generatePdf}
        >
          Download Table PDF
        </button>
      </nav>
    </article>
  );
}
