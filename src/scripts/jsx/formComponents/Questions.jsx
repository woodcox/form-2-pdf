import DateInput from './../factory/DateInput.jsx';
import AppendFields from './../factory/AppendFields.jsx';
import Radio from './../factory/Radio.jsx';
import CeremonyWords from './../factory/CeremonyWords.jsx';
import Textarea from './../factory/Textarea.jsx';
import Dropdown from './../factory/Dropdown.jsx';
import Autocomplete  from './../factory/Autocomplete.jsx';
import AddAnotherParent  from './../factory/AddAnotherParent.jsx';
import AddAnotherMusic  from './../factory/AddAnotherMusic.jsx';
//import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

// Map of components to import dynamically
const componentMap = {
  DateInput,
  AppendFields,
  Dropdown,
  Autocomplete,
  Radio,
  Textarea,
  CeremonyWords,
  AddAnotherParent,
  AddAnotherMusic, // Add the Dropdown component to the component map
  // Add more components here as needed
};

export default function Questions({
  template,
  currentPage,
  localInputs,
  handleChange,
  setPdfState = (updateFn) => {}, // Default to no-op for safety
}) {
  return (
    <For each={Object.entries(template.schemas[0])}>
      {(entry) => {
        const [property, config] = entry;

        // Filter out input fields that are not on the currentPage unless the current page is '/summary'
        if (
          config.pageUrl !== currentPage &&
          currentPage !== '/summary'
        ) {
          return null;
        }

        // Check if a component is specified in the schema entry
        if (config.component && currentPage !== '/summary') {
          // Dynamically render the specified component
          const DynamicComponent = componentMap[config.component];
          if (DynamicComponent) {
            const { componentProps } = config; // Get all componentProps

            // Add a safeguard to ensure setPdfState is defined
            if (!setPdfState) {
              console.error('setPdfState is not defined!');
              return null;
            }

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

        if (currentPage !== '/summary') {
          return (
            <DynamicField
              property={property}
              config={config}
              localInputs={localInputs}
              handleChange={handleChange}
            />
          );
        }
      }}
    </For>
  );
}

function DynamicField({ property, config, localInputs, handleChange }) {
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
        autocomplete={config.autocomplete}
        autofocus={config.autofocus}
        value={localInputs()[property]}
        onChange={(e) => handleChange(property, e.target.value)}
      />
    </div>
  );
}
