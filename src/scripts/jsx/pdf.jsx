import { createSignal, onCleanup } from 'solid-js';
import { render } from "solid-js/web";
import { generate } from '@pdfme/generator';

function PdfmeGenerator() {
  const [template, setTemplate] = createSignal({});
  const [inputs, setInputs] = createSignal([]);

  async function generatePdf() {
    console.log(template());
    console.log(inputs());

    const pdf = await generate({
      template: template(),
      inputs: inputs(),
    });
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  }

  onCleanup(() => {
    setTemplate(null);
    setInputs(null);
  });

  return (
    <div class="pdfme-generator">
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
}

render(PdfmeGenerator, document.getElementById("pdf"));
