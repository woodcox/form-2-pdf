import Form from './../formComponents/Form.jsx';
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
        pageNumber="8"
        currentPage="/partner-parents"
        prevPage="/your-parents"
        nextPage="/music"
      />
    </>
  );
}