import { template, setTemplate } from './../pdfme/schema.jsx';
import { inputs, setInputs } from './../state/formInputs.jsx';

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
      <nav>
        <a href="/intro">
          <i>Back</i>
        </a>
        <a href="/pdf">
          <b>Next</b>
        </a>
      </nav>
    </form>
  );
}

function Test() {
  return (
    <>
      <Form 
        template={template()}
        inputs={inputs()}
        onInputsChange={(newInputs) => setInputs(newInputs)}
      />
    </>
  )
}

export default Test;