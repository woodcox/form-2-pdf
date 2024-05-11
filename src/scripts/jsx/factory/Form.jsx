import { createSignal } from 'solid-js';
import DateInput from './DateInput.jsx';
import { Radios } from 'govuk-frontend/dist/govuk/components/radios/radios.mjs';
//import SummaryList from './SummaryList.jsx';
import AppendFields from './AppendFields.jsx';
import Radio from './Radio.jsx';
import Dropdown from './Dropdown.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';
import { Button } from 'govuk-frontend';
import { onMount, onCleanup } from 'solid-js';

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

  //let groupedInputs = '';

    // Initialize the buttons component when the component mounts
    onMount(() => {


      // Initialize the Govuk components when the component mounts
  
      const radiosElements = document.querySelectorAll('[data-module="govuk-radios"]');
      const radiosInstances = Array.from(radiosElements).map((element) => new Radios(element));
   
      const buttonElements = document.querySelectorAll('[data-module="govuk-button"]');
      const buttonInstances = Array.from(buttonElements).map((element) => new Radios(element));
  
      // Cleanup function to destroy the govuk instances when the component unmounts
      onCleanup(() => {
        buttonInstances.forEach((instance) => instance.destroy());
        radiosInstances.forEach((instance) => instance.destroy());
      });
    });

  return (
    <form>
      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 class="govuk-fieldset__heading">{props.heading}</h1>
        </legend>
        <Show when={props.headline}>
          <p class="govuk-body">{props.headline}</p>
        </Show>

        <For each={Object.entries(props.template.schemas[0])}>
          {(entry) => {
            const [property, config] = entry;

            // Filter out input fields that are not on the currentPage unless the current page is '/summary'
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

            if (props.currentPage !== '/summary') {
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
                    //readonly={isSummaryPage ? 'readonly' : null} // form becomes readonly if currentPage = '/summary'
                    autocomplete={config.autocomplete}
                    autofocus={config.autofocus}
                    value={localInputs()[property]}
                    onChange={(e) => handleChange(property, e.target.value)}
                  />
                </div>
              );
            }
          }}
        </For>

        {/* Grouped Fields for summary list
        This function groups fields based on their pageUrl property.
        It iterates through each entry in the props.template.schemas[0] object, where each entry represents a field property and its configuration.
        For each field, it checks if a pageUrl property is defined in its configuration.
        If a pageUrl property is found, it initializes an array in the acc object with the pageUrl as the key if it doesn't already exist.
        It then pushes an object containing the field's property and configuration to the array corresponding to the pageUrl.
        Finally, it returns the acc object, which contains the fields grouped by their pageUrl. */}

        {/* Render grouped fields for summary page 
        PATTERN - https://design-system.service.gov.uk/patterns/check-answers/*/
        }
        {props.currentPage === '/summary' && (
          <>
            {/* Define and execute the assignment outside of JSX */}
            {() => {
              const groupedInputs = Object.entries(
                props.template.schemas[0]
              ).reduce((group, [key, input]) => {
                const { pageUrl } = input;
                if (!group.has(pageUrl)) {
                  group.set(pageUrl, []);
                }
                const pageGroup = group.get(pageUrl);
                pageGroup.push({ [key]: input });
                return group;
              }, new Map());
              // console.log(groupedInputs); // You can uncomment this line for debugging

              return (
                <For each={Array.from(groupedInputs.entries())}>
                  {(entry) => {
                    const [pageUrl, fields] = entry;
                    return (
                      <>
                      {/* TO DO: Update if add more pageUrls */}
                      <Switch fallback="">
                        <Match when={pageUrl === "/your-details"}>
                          <h2 class="govuk-heading-m">Personal details</h2>
                        </Match>
                        <Match when={pageUrl === "/partner"}>
                          <h2 class="govuk-heading-m">Your partner's details</h2>
                        </Match>
                        <Match when={pageUrl === "/booking"}>
                          <h2 class="govuk-heading-m">Your booking</h2>
                        </Match>
                        <Match when={pageUrl === "/ceremony"}>
                          <h2 class="govuk-heading-m">Ceremony details</h2>
                        </Match>
                        <Match when={pageUrl === "/witness"}>
                          <h2 class="govuk-heading-m">Your witnesses</h2>
                        </Match>
                        <Match when={pageUrl === "/your-parents"}>
                          <h2 class="govuk-heading-m">Your parents</h2>
                        </Match>
                        <Match when={pageUrl === "/partner-parents"}>
                          <h2 class="govuk-heading-m">Your partners parents</h2>
                        </Match>
                      </Switch>
                        <dl class="govuk-summary-list govuk-!-margin-bottom-9">
                          <For each={fields}>
                            {(fieldEntry) => {
                              const [schemaKey, schemaObject] =
                                Object.entries(fieldEntry)[0]; // Get the schema key and schema object
                              const { label } = schemaObject;
                              return (
                                <div class="govuk-summary-list__row">
                                  <dt class="govuk-summary-list__key">
                                    {label}
                                  </dt>
                                  <dd class="govuk-summary-list__value">
                                    {localInputs()[schemaKey]}
                                  </dd>
                                  <dd class="govuk-summary-list__actions">
                                    <a class="govuk-link" href={`${urlPrefix}${pageUrl}`}>
                                      Change
                                    </a>
                                  </dd>
                                </div>
                              );
                            }}
                          </For>
                        </dl>
                      </>
                    );
                  }}
                </For>
              );
            }}
          </>
        )}
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
