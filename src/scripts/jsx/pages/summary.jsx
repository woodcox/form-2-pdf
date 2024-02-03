import Form from './../factory/Form.jsx';
import { template } from './../pdfme/schema.jsx';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';

export default function Summary() {
  return (
    <>
      <Form
        template={template()}
        inputs={inputState}
        onInputsChange={(newInputs) => setInputState(newInputs)}
        heading="Summary"
        currentPage="/summary"
        prevPage="/ceremony"
        nextPage="/pdf"
      />
    </>
  );
}
