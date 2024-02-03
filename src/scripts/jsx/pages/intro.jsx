import Form from './../factory/Form.jsx';
import { template } from './../pdfme/pdfSchema.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

export default function Intro() {
  return (
    <>
      <Form
        template={template()}
        inputs={pdfState}
        onInputsChange={(newInputs) => setPdfState(newInputs)}
        heading="Ceremony options"
        currentPage="/"
        prevPage="/"
        nextPage="/your-details"
        headline="Choose your ceremony options for your marriage or civil partnership. This form will create a pdf which you can save. Then you will need to email the pdf to Leeds Register Office."
      />
    </>
  );
}
