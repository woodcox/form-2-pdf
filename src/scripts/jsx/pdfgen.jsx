import { createSignal } from 'solid-js';
import { generate } from '@pdfme/generator';

const BLANK_PDF = "data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDM4Cj4+CnN0cmVhbQp4nCvkMlAwUDC1NNUzMVGwMDHUszRSKErlCtfiyuMK5AIAXQ8GCgplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFswIDAgNTk1LjQ0IDg0MS45Ml0KL1Jlc291cmNlcyA8PAo+PgovQ29udGVudHMgNSAwIFIKL1BhcmVudCAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzQgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL3RyYXBwZWQgKGZhbHNlKQovQ3JlYXRvciAoU2VyaWYgQWZmaW5pdHkgRGVzaWduZXIgMS4xMC40KQovVGl0bGUgKFVudGl0bGVkLnBkZikKL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMDEwNjE0MDg1OCswOScwMCcpCi9Qcm9kdWNlciAoaUxvdmVQREYpCi9Nb2REYXRlIChEOjIwMjIwMTA2MDUwOTA5WikKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1NpemUgNwovUm9vdCAxIDAgUgovSW5mbyAzIDAgUgovSUQgWzwyODhCM0VENTAyOEU0MDcyNERBNzNCOUE0Nzk4OUEwQT4gPEY1RkJGNjg4NkVERDZBQUNBNDRCNEZDRjBBRDUxRDlDPl0KL1R5cGUgL1hSZWYKL1cgWzEgMiAyXQovRmlsdGVyIC9GbGF0ZURlY29kZQovSW5kZXggWzAgN10KL0xlbmd0aCAzNgo+PgpzdHJlYW0KeJxjYGD4/5+RUZmBgZHhFZBgDAGxakAEP5BgEmFgAABlRwQJCmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjUzMgolJUVPRgo=";

function PdfmeGenerator() {
  const [template, setTemplate] = createSignal({
    basePdf: BLANK_PDF,
    schemas: [
      {
        Fullname: {
          label: 'Full name',
          type: 'text',
          position: { x: 20, y: 20 },
          width: 100,
          height: 10,
          fieldType: 'text',
          errormessage: 'Please enter your name',
          required: true,
          autofocus: true,
        },
        Address: {
          label: 'Address',
          type: 'text',
          position: { x: 20, y: 30 },
          width: 140,
          height: 10,
          fieldType: 'text',
          errormessage: 'Enter your full address',
          required: false,
        },
        Phone: {
          label: 'Telephone number',
          type: 'text',
          position: { x: 20, y: 40 },
          width: 100,
          height: 10,
          fieldType: 'tel',
          errormessage: 'Enter a UK phone number',
          autocomplete: 'tel',
          required: true,
        },
        Date: {
          label: 'Date of event',
          type: 'text',
          position: { x: 20, y: 50 },
          width: 100,
          height: 10,
          fieldType: 'date',
          required: true,
          placeholder: 'dd/mm/yyyy',
        },
      },
    ],
  });
  
  const defaultValues = { Fullname: '', Address: '', Phone: '', Date: '' }
  const [inputs, setInputs] = createSignal(defaultValues);

  async function generatePdf() {
    console.log(template());
    console.log(inputs());

    const pdf = await generate({
      template: template(),
      inputs: [inputs()],
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

    setInputs(defaultValues); // Reset inputs to default state after pdf generated
  }

  return (
    <div class="pagination-container" aria-label="Pagination">
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
