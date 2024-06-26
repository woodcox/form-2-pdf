import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

// TO DO: https://design-system.dwp.gov.uk/patterns/add-another-thing/example
export default function AddYourMum() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your parents"
        currentPage="/your-mum"
        prevPage="/your-parents"
        nextPage="/partner-parents"
      />
    </>
  );
}
