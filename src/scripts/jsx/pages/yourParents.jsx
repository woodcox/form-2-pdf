import Form from './../factory/Form.jsx';
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
        headline="Your parents details can be on your certificate. You can add your mother, father, parent or step-parent(s)."
        currentPage="/your-parents"
        prevPage="/witness"
        nextPage="/partner-parents"
        mumPage="/your-mum"
        dadPage="/your-dad"
      />
    </>
  );
}