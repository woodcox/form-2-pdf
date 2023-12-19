import Form from './../state/Form.jsx';
import { template, setTemplate } from './../pdfme/schema.jsx';
import { inputs, setInputs } from './../state/formInputs.jsx';

export default function YourPartner() {
  return (
    <>
      <Form
        template={template()}
        inputs={inputs()}
        onInputsChange={(newInputs) => setInputs(newInputs)}
        currentPage="/partner"
        prevPage="/"
        nextPage="/pdf"
      />
    </>
  );
}