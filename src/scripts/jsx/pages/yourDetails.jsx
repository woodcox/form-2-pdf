import Form from './../factory/Form.jsx';
import { template } from './../pdfme/schema.jsx';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';

export default function YourDetails() {
  return (
    <>
      <Form
        template={template()}
        inputs={inputState}
        onInputsChange={(newInputs) => setInputState(newInputs)}
        heading="Your details"
        currentPage="/your-details"
        prevPage="/"
        nextPage="/partner"
      />
    </>
  );
}
