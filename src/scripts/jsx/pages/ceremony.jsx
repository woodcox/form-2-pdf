import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function Ceremony() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your ceremony"
        pageNumber="4"
        currentPage="/ceremony"
        prevPage="/booking"
        nextPage="/witness"
      />
    </>
  );
}