import Form from './../formComponents/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function Music() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your music"
        headline="You cannot have any religious music"
        pageNumber="9"
        currentPage="/music"
        prevPage="/partner-parents"
        nextPage="/summary"
      />
    </>
  );
}
