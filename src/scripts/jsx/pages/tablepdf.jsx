import { tableBeta } from '@pdfme/schemas';
import { generate } from '@pdfme/generator';
//import { template, setTemplate } from './../pdfme/pdfSchema.jsx';
//import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

const template = {
  schemas: [
    {
      mytable: {
        type: 'table',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>',
        position: { x: 28.706846058368317, y: 37.85750960310253 },
        width: 150,
        height: 57.5184,
        content:
          '[["Alice","New York","Alice is a freelance web designer and developer"],["Bob","Paris","Bob is a freelance illustrator and graphic designer"]]',
        showHead: true,
        head: ['Name', 'City', 'Description'],
        headWidthPercentages: [30, 30, 40],
        tableStyles: { borderWidth: 0.3, borderColor: '#000000' },
        headStyles: {
          fontName: 'NotoSerifJP-Regular',
          fontSize: 13,
          characterSpacing: 0,
          alignment: 'left',
          verticalAlignment: 'middle',
          lineHeight: 1,
          fontColor: '#ffffff',
          borderColor: '',
          backgroundColor: '#2980ba',
          borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
          padding: { top: 5, right: 5, bottom: 5, left: 5 },
        },
        bodyStyles: {
          fontName: 'NotoSerifJP-Regular',
          fontSize: 13,
          characterSpacing: 0,
          alignment: 'left',
          verticalAlignment: 'middle',
          lineHeight: 1,
          fontColor: '#000000',
          borderColor: '#888888',
          backgroundColor: '',
          alternateBackgroundColor: '#f5f5f5',
          borderWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0.1 },
          padding: { top: 5, right: 5, bottom: 5, left: 5 },
        },
        columnStyles: {},
      },
    },
  ],
  basePdf: { width: 210, height: 297, padding: [10, 10, 10, 10] },
};

const inputs = [
  {
    mytable: JSON.stringify([
      ["Alice", "New York", "Alice is a freelance web designer and developer"],
      ["Bob", "Paris", "Bob is a freelance illustrator and graphic designer"],
    ]),
  },
];

const pathPrefix = process.env.PATHPREFIX;
let urlPrefix = pathPrefix ? `/${pathPrefix}` : '';

export default function TablePdf() {
  async function generatePdf() {
    //console.log(template());
    //console.log(pdfState);

    const pdf = await generate({
      template: template, // using signals
      plugins: { Table: tableBeta }, // add the pdfme dynamic table plugin schemas
      inputs: inputs, // [pdfState], using state
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
    //setInputState(defaultValues); // Reset inputs to default state after pdf generated
  }

  return (
    <>
      <CreatePdf heading="Testing tables" generatePdf={generatePdf} />
    </>
  );
}

function CreatePdf(props) {
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
          Create PDF
        </button>
      </nav>
    </article>
  );
}
