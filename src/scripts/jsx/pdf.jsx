import { createSignal } from 'solid-js';
import { generate } from '@pdfme/generator';

function PdfmeGenerator() {
  const [template, setTemplate] = createSignal({
    basePdf: '/path/to/blank.pdf',
    schemas: [
      {
        a: {
          type: 'text',
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        b: {
          type: 'text',
          position: { x: 10, y: 10 },
          width: 10,
          height: 10,
        },
        c: {
          type: 'text',
          position: { x: 20, y: 20 },
          width: 10,
          height: 10,
        },
      },
    ],
  });

  const [inputs, setInputs] = createSignal({ a: 'a1', b: 'c1', c: 'f1' });

  async function generatePdf() {
    console.log(template());
    console.log(inputs());

    const pdf = await generate({
      template: template(),
      inputs: [inputs()],
    });
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  }

  return (
    <div class="pdfme-generator">
      <form>
        <label>
          Property a:
          <input
            type="text"
            name="a"
            value={inputs().a}
            onInput={handleInputChange}
          />
        </label>
        <label>
          Property b:
          <input
            type="text"
            name="b"
            value={inputs().b}
            onInput={handleInputChange}
          />
        </label>
        <label>
          Property c:
          <input
            type="text"
            name="c"
            value={inputs().c}
            onInput={handleInputChange}
          />
        </label>
      </form>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
}

export default PdfmeGenerator;
