import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function PartnerParents() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your partners parents"
        currentPage="/partner-parents"
        prevPage="/your-parents"
        nextPage="/summary"
      />
    </>
  );
}