import Form from './../formComponents/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function YourParents() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your parents"
        pageNumber="7"
        headline="Your parents details can be on your certificate."
        currentPage="/your-parents"
        prevPage="/witness"
        nextPage="/partner-parents"
      />
    </>
  );
}