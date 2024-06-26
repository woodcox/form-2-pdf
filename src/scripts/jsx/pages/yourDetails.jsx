import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import AddAnother from './../factory/AddAnother.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function YourDetails() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="About you"
        currentPage="/your-details"
        prevPage="/"
        nextPage="/partner"
      />
    </>
  );
}
