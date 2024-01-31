import { generate } from '@pdfme/generator';
import { template, setTemplate } from './../pdfme/schema.jsx';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';
const pathPrefix = process.env.PATHPREFIX;
let urlPrefix = pathPrefix ? `/${pathPrefix}` : "";

export default function PdfmeGenerator() {
  
  async function generatePdf() {
    console.log(template());
    console.log(inputState);

    const pdf = await generate({
      template: template(),  // using signals
      inputs: [inputState],  // using state
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
    //setInputState(defaultValues); // Reset inputs to default state after pdf generated
  }

  return (
    <>
        <CreatePdf 
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
      <p>Please generate your ceremony options as a PDF. Then email it to ....</p>
      <nav>
        <a href={prevPagePrefix}>
          <i>Back</i>
        </a>
        <button type="reset" onClick={props.generatePdf}>Create PDF</button>
        <a href={cancelPagePrefix}>
          <i>Cancel</i>
        </a>
      </nav>
    </article>
  );
}