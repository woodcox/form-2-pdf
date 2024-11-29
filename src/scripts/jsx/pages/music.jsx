import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

// TO DO: https://design-system.dwp.gov.uk/patterns/add-another-thing/example
export default function Music() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Your music"
        headline="You cannot have any religious music"
        pageNumber="8"
        currentPage="/music"
        prevPage="/partner-parents"
        nextPage="/summary"
      />
    </>
  );
}
