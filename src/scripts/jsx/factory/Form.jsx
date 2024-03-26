import { createSignal } from 'solid-js';
import DateInput from './DateInput.jsx';
import SummaryList from './SummaryList.jsx';
import AppendFields from './AppendFields.jsx';
import Radio from './Radio.jsx';
import Dropdown from './Dropdown.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

// Map of components to import dynamically
const componentMap = {
  DateInput,
  AppendFields,
  Dropdown,
  Radio, // Add the Dropdown component to the component map
  // Add more components here as needed
};

const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : '';

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
      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 class="govuk-fieldset__heading">{props.heading}</h1>
        </legend>
        <Show when={props.headline}>
          <p class="govuk-body">{props.headline}</p>
        </Show>

        <Show when={props.currentPage === '/your-details'}>
          <SummaryList name="test" label="Test field" value="" button="Edit" />
        </Show>

        <For each={Object.entries(props.template.schemas[0])}>
          {(entry) => {
            const [property, config] = entry;
            const isSummaryPage = props.currentPage === '/summary';

            // filter out input field that are not on the currentPage unless the current page is '/summary'
            if (
              config.pageUrl !== props.currentPage &&
              props.currentPage !== '/summary'
            ) {
              return null;
            }

            // Check if a component is specified in the schema entry
            if (config.component && props.currentPage !== '/summary') {
              // Dynamically render the specified component
              const DynamicComponent = componentMap[config.component];
              if (DynamicComponent) {
                const { componentProps } = config; // Get all componentProps
                return (
                  <DynamicComponent
                    {...componentProps}
                    // All components imported via dynamic components must use the onChange attribute to call the function. As this will update the pdfState via the Form component. Look in the Dropdown component for an example.
                    onChange={(result) =>
                      setPdfState((prev) => ({ ...prev, [property]: result }))
                    }
                  />
                );
              } else {
                console.error(`Component '${config.component}' not found.`);
                return null;
              }
            }

            return (
              <div class="govuk-form-group">
                <label class="govuk-label" for={property}>
                  {config.label}
                  {!config.required && <span> (optional)</span>}
                </label>
                <input
                  class="govuk-input"
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
              </div>
            );
          }}
        </For>
      </fieldset>
      <nav class="govuk-button-group">
        <Show when={props.currentPage != '/'}>
          <a
            role="button"
            draggable="false"
            class="govuk-button govuk-button--secondary"
            data-module="govuk-button"
            href={prevPagePrefix}
          >
            Back
          </a>
        </Show>
        <Show
          when={props.currentPage == '/'}
          fallback={
            <a
              role="button"
              draggable="false"
              class="govuk-button"
              data-module="govuk-button"
              href={nextPagePrefix}
            >
              Next
            </a>
          }
        >
          <a
            role="button"
            draggable="false"
            class="govuk-button govuk-button--start"
            data-module="govuk-button"
            href={nextPagePrefix}
          >
            Start
            <svg
              class="govuk-button__start-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </a>
        </Show>
      </nav>
    </form>
  );
}
