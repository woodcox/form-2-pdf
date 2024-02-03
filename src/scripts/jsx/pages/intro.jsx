import Form from './../factory/Form.jsx';
import { template } from './../pdfme/schema.jsx';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';

export default function Intro() {
  return (
    <>
      <Form
        template={template()}
        inputs={inputState}
        onInputsChange={(newInputs) => setInputState(newInputs)}
        heading="Ceremony options"
        currentPage="/"
        prevPage="/"
        nextPage="/your-details"
        headline="Choose your ceremony options for your marriage or civil partnership. This form will create a pdf which you can save. Then you will need to email the pdf to Leeds Register Office."
      />
    </>
  );
}
