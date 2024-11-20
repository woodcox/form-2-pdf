import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function YourPartner() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="About your partner"
        pageNumber="2"
        currentPage="/partner"
        prevPage="/your-details"
        nextPage="/booking"
      />
    </>
  );
}
