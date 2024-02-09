import { createSignal } from 'solid-js';
import { DateInput } from './DateInput.jsx';
import Date from './Date.jsx';
import JoinFields from './Join.jsx';
import Dropdown from './Dropdown.jsx';

// Map of components to import dynamically
const componentMap = {
  Date,
  JoinFields,
  Dropdown, // Add the Dropdown component to the component map
  // Add more components here as needed
};

const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : '';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

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
      <Show when={props.headline}>
        <p>{props.headline}</p>
      </Show>
      <Show when={props.currentPage === '/your-details'}>
        <JoinFields
          props={{
            yourFirstname: 'Your first name',
            yourMiddlename: 'Your middle names (optional)',
            yourLastname: 'Your surname',
          }}
          onResultChange={(result) => setPdfState({ YourFullName: result })}
        />
      </Show>
      <Show when={props.currentPage === '/partner'}>
        <JoinFields
          props={{
            partnerFirstname: 'Their firstname',
            partnerMiddlename: 'Their middle names (optional)',
            partnerLastname: 'Their surname',
          }}
          onResultChange={(result) => setPdfState({ PartnerFullName: result })}
        />
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
          if (config.component && props.currentPage !== '/summary' ) {
            // Dynamically render the specified component
            const DynamicComponent = componentMap[config.component];
            if (DynamicComponent) {
              const { componentProps } = config; // Get all componentProps
              return <DynamicComponent {...componentProps} />;
            } else {
              console.error(`Component '${config.component}' not found.`);
              return null;
            }
          }

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
        }}
      </For>
      <Show when={props.currentPage === '/booking'}>
        <DateInput
          onInputsChange={(newInputs) => setPdfState(newInputs)}
          heading="What date is your ceremony?"
        />
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
