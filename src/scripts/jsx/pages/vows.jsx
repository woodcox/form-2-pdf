import Form from './../formComponents/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function Vows() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your vows"
        headline="The registrar will lead the ceremony. During the ceremony you will repeat the following after the registrar."
        pageNumber="5"
        currentPage="/vows"
        prevPage="/ceremony"
        nextPage="/witness"
      />
    </>
  );
}