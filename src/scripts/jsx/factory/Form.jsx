import { createSignal } from 'solid-js';
import { DateInput } from './DateInput.jsx';
const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : '';
import { inputState, setInputState } from './../pdfme/formInputs.jsx';

export default function Form(props) {
  // Add urlPrefix to navigation links
  const prevPagePrefix = `${urlPrefix}${props.prevPage}`;
  const nextPagePrefix = `${urlPrefix}${props.nextPage}`;

  // create local signals
  const [localInputs, setLocalInputs] = createSignal(props.inputs);

  const handleChange = (property, value) => {
    setLocalInputs({ ...localInputs(), [property]: value });
    props.onInputsChange({ ...props.inputs, [property]: value });
  };

  return (
    <form>
      <h1>{props.heading}</h1>
      {Object.entries(props.template.schemas[0]).map(([property, config]) => {
        // filter out input field that are not on the currentPage unless the current page is '/summary'
        if (config.pageUrl !== props.currentPage && props.currentPage !== '/summary') return null;

        const isSummaryPage = props.currentPage === '/summary';

        return (
          <>
            <label for={property}>
              {config.label}
              {!config.required && <span> (optional)</span>}:
              <input
                name={property}
                id={property}
                type={config.fieldType}
                title={config.errormessage}
                required={config.required}
                placeholder={config.placeholder}
                pattern={config.pattern}
                readonly={isSummaryPage ? 'readonly' : null} // form becomes readonly if currentPage = '/summary'
                autocomplete={config.autocomplete}
                autofocus={config.autofocus}
                value={localInputs()[property]}
                onChange={(e) => handleChange(property, e.target.value)}
              />
            </label>
          </>
        );
      })}
      <Show when={props.currentPage === '/ceremony'}>
        <DateInput onInputsChange={(newInputs) => setInputState(newInputs)} heading="What date is your ceremony?" />
      </Show>
      <nav>
        <Show when={props.currentPage != '/'}>
            <a href={prevPagePrefix}>
              <i>Back</i>
            </a>
        </Show>
        <a href={nextPagePrefix}>
          <b>Next</b>
        </a>
      </nav>
    </form>
  );
}
