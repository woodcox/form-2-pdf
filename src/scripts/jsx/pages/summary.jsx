import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function Summary() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Summary"
        headline="You have not completed the form yet. Please check the details are correct before clicking next."
        currentPage="/summary"
        prevPage="/partner-parents"
        nextPage="/pdf"
      />
    </>
  );
}
