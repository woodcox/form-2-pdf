import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function Witness() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your witnesses"
        pageNumber="5"
        headline="Your witnesses must be over 16 years old and can speak and understand English."
        currentPage="/witness"
        prevPage="/ceremony"
        nextPage="/your-parents"
      />
    </>
  );
}