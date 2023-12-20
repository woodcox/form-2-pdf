import { generate } from '@pdfme/generator';
import { template, setTemplate } from './pdfme/schema.jsx';
import { inputs, setInputs } from './state/formInputs.jsx';
const pathPrefix = process.env.PATHPREFIX;
let urlPrefix = pathPrefix ? `/${pathPrefix}` : "/";

function PdfmeGenerator() {

  async function generatePdf() {
    console.log(template());
    console.log(inputs());

    const pdf = await generate({
      template: template(),
      inputs: [inputs()],
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
    //setInputs(defaultValues); // Reset inputs to default state after pdf generated
  }

  return (
    <>
        <CreatePdf 
          generatePdf={generatePdf}
        />
    </>
  );
}

function CreatePdf(props) {
  return (
    <article>
      <p>Please generate your ceremony options as a PDF. Then email it to ....</p>
      <button type="reset" onClick={props.generatePdf}>Create PDF</button>
      <a href={urlPrefix}>
        <i>Cancel</i>
      </a>
    </article>
  );
}

export default PdfmeGenerator;