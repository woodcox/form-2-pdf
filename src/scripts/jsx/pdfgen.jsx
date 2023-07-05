import { createSignal } from 'solid-js';
import { generate } from '@pdfme/generator';

const NUM_BLANK_PAGES = 3;
const BASE_PDF = "data:application/pdf;base64,JVBERi0xLjcKJeLjz9MKNSAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDM4Cj4+CnN0cmVhbQp4nCvkMlAwUDC1NNUzMVGwMDHUszRSKErlCtfiyuMK5AIAXQ8GCgplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFswIDAgNTk1LjQ0IDg0MS45Ml0KL1Jlc291cmNlcyA8PAo+PgovQ29udGVudHMgNSAwIFIKL1BhcmVudCAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzQgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL3RyYXBwZWQgKGZhbHNlKQovQ3JlYXRvciAoU2VyaWYgQWZmaW5pdHkgRGVzaWduZXIgMS4xMC40KQovVGl0bGUgKFVudGl0bGVkLnBkZikKL0NyZWF0aW9uRGF0ZSAoRDoyMDIyMDEwNjE0MDg1OCswOScwMCcpCi9Qcm9kdWNlciAoaUxvdmVQREYpCi9Nb2REYXRlIChEOjIwMjIwMTA2MDUwOTA5WikKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1NpemUgNwovUm9vdCAxIDAgUgovSW5mbyAzIDAgUgovSUQgWzwyODhCM0VENTAyOEU0MDcyNERBNzNCOUE0Nzk4OUEwQT4gPEY1RkJGNjg4NkVERDZBQUNBNDRCNEZDRjBBRDUxRDlDPl0KL1R5cGUgL1hSZWYKL1cgWzEgMiAyXQovRmlsdGVyIC9GbGF0ZURlY29kZQovSW5kZXggWzAgN10KL0xlbmd0aCAzNgo+PgpzdHJlYW0KeJxjYGD4/5+RUZmBgZHhFZBgDAGxakAEP5BgEmFgAABlRwQJCmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjUzMgolJUVPRgo=";

function PdfmeGenerator() {
  const [template, setTemplate] = createSignal({
    basePdf: BASE_PDF,
    schemas: [
      {
        Name: {
          type: 'text',
          position: { x: 20, y: 20 },
          width: 100,
          height: 10,
        },
        Address: {
          type: 'text',
          position: { x: 20, y: 30 },
          width: 140,
          height: 10,
        },
        Phone: {
          type: 'text',
          position: { x: 20, y: 40 },
          width: 100,
          height: 10,
        },
      },
    ],
  });
  
  const defaultValues = { Name: '', Address: '', Phone: '' }
  const [inputs, setInputs] = createSignal(defaultValues);

  async function generatePdf() {
    console.log(template());
    console.log(inputs());

    const pdf = await generate({
      template: template(),
      inputs: [inputs()],
    });
    const blankPdfPages = BASE_PDF.repeat(NUM_BLANK_PAGES); // Repeat the base PDF string for the specified number of blank pages
    const mergedPdf = pdf.buffer + blankPdfPages; // Concatenate the generated PDF with the blank pages

    const blob = new Blob([mergedPdf], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

    setInputs(defaultValues); // Reset inputs to default state after pdf generated
  }

  return (
    <div>
      <Form
        template={template()}
        inputs={inputs()}
        onInputsChange={(newInputs) => setInputs(newInputs)}
      />
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
}

function Form(props) {
  return (
    <form>
      {Object.entries(props.template.schemas[0]).map(([property, config]) => (
        <label>
          {property}:
          <input
            type="text"
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
    </form>
  );
}

export default PdfmeGenerator;
