import Form from './../factory/Form.jsx';
import { template } from './../pdfme/schema.jsx';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';

export default function Intro() {
  return (
    <>
      <p>This is the start of the form. Write some intro text here</p>
      <Form
        template={template()}
        inputs={inputState}
        onInputsChange={(newInputs) => setInputState(newInputs)}
        heading="Select your ceremony options"
        currentPage="/"
        prevPage="/"
        nextPage="/your-details"
      />
    </>
  );
}
