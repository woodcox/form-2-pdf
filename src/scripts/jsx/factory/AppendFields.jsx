import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

// Define a global object to store the state of all instances of AppendFields
const globalFieldValues = {};

function AppendFields(props) {
  // Derive the store name from the componentId prop
  const storeName = `fieldValues_${props.componentId}`;

  // Check if the store for this component instance exists, if not, create a new one
  if (!globalFieldValues[storeName]) {
    globalFieldValues[storeName] = createStore({});
  }

  // Get the field values store for this component instance
  const [fieldValues, setFieldValues] = globalFieldValues[storeName];

  // Initialize state for each field
  Object.keys(props.fields).forEach((field) => {
    const fieldName = props.fields[field].name;
    if (!fieldValues[fieldName]) {
      // Initialize field value in the store
      setFieldValues((prev) => ({ ...prev, [fieldName]: '' }));
    }
  });

  // Create effect to update result whenever field values change
  createEffect(() => {
    const joinedResult = Object.values(fieldValues)
      .map((value) => value) // Extract the values from the store
      .filter(Boolean) // Remove empty values
      .join(' ');

    // Assuming you have a function named `onChange` in props
    props.onChange(joinedResult);
  });

  return (
    <>
      <For each={props.fields}>
        {(field) => (
          <div class="govuk-form-group">
            <label class="govuk-label" for={field.name}>{field.label}</label>
            <input
              class="govuk-input"
              type="text"
              id={field.name}
              value={fieldValues[field.name]}
              onInput={(e) => setFieldValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
            />
          </div>
        )}
      </For>
    </>
  );
}

export default AppendFields;
