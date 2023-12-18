import { createSignal } from 'solid-js';
import { generate } from '@pdfme/generator';
import { schema } from './pdfme/schema.jsx';

const defaultValues = { 
  YourFirstName: '',
  YourSurname: '',
  PartnerFirstName: '',
  PartnerSurname: '',
  Email: '', 
  Phone: '', 
  Date: '', 
  Mother: '' 
}

const [inputs, setInputs] = createSignal(defaultValues);

const [template, setTemplate] = createSignal(schema); // use schema.jsx

function PdfmeGenerator() {

  async function generatePdf() {
    console.log(template());
    console.log(inputs());

    const pdf = await generate({
      template: template(),
      inputs: [inputs()],
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
    //setInputs(defaultValues); // Reset inputs to default state after pdf generated
  }

  return (
    <div>
      <Form 
        template={template()}
        inputs={inputs()}
        onInputsChange={(newInputs) => setInputs(newInputs)}
      />

      <dialog id="pdfDialog">
        <form>
          <p>Please generate your ceremony options as a pdf. Then email it to ....</p>
          <button formmethod="dialog" autofocus type="reset" onclick={generatePdf}>Generate PDF</button>
          <button onclick="this.closest('dialog').close('Cancel')">Cancel</button>
        </form>
      </dialog>
    </div>
  );
}

function Form(props) {
  return (
    <form>
      {Object.entries(props.template.schemas[0]).map(([property, config]) => (
        <label for={property}>
          {config.label}
          {!config.required && <span> (optional)</span>}:
          <input
            name={property}
            id={property}
            class="pagination-list"
            type={config.fieldType}
            title={config.errormessage}
            required={config.required}
            placeholder={config.placeholder}
            pattern={config.pattern}
            autocomplete={config.autocomplete}
            autofocus={config.autofocus}
            value={props.inputs[property]}
            onChange={(e) =>
              props.onInputsChange({
                ...props.inputs,
                [property]: e.target.value,
              })
            }
          />
        </label>
      ))}
      <button type="submit" onclick="pdfDialog.showModal()">Continue</button>
    </form>
  );
}

export default PdfmeGenerator;
