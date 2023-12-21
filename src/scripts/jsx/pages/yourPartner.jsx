import Form from './../factory/Form.jsx';
import { template } from './../pdfme/schema.jsx';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';

export default function YourPartner() {
  return (
    <>
      <Form
        template={template()}
        inputs={inputState}
        onInputsChange={(newInputs) => setInputState(newInputs)}
        currentPage="/partner"
        prevPage="/your-details"
        nextPage="/ceremony"
      />
    </>
  );
}