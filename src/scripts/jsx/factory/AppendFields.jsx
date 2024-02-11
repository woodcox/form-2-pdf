import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

function AppendFields(props) {
  const [fieldValues, setFieldValues] = createStore({});
  
  // Initialize state for each field
  Object.keys(props.fields).forEach((field) => {
    const fieldName = props.fields[field].name;
    if (!fieldValues[fieldName]) {
      // Initialize field value in the store
      setFieldValues(fieldName, '');
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
          <>
            <label for={field.name}>{field.label}:</label>
            <input
              type="text"
              id={field.name}
              value={fieldValues[field.name]}
              onInput={(e) => setFieldValues(field.name, e.target.value)}
            />
          </>
        )}
      </For>
    </>
  );
}

export default AppendFields;
