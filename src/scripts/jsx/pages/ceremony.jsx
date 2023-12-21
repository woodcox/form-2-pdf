import Form from './../factory/Form.jsx';
import { template } from './../pdfme/schema.jsx';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';

export default function Ceremony() {
  return (
    <>
      <Form
        template={template()}
        inputs={inputState}
        onInputsChange={(newInputs) => setInputState(newInputs)}
        currentPage="/ceremony"
        prevPage="/partner"
        nextPage="/pdf"
      />
    </>
  );
}