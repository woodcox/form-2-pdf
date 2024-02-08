import { createSignal, createEffect, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

// TO DO: work out how to preserve the state of the value signal and result signal
// Probably need to lift them out of the function in a way that does not break the function

// Create a store to manage field values


function JoinFields({ props, onResultChange }) {
  const [fieldValues, setFieldValues] = createStore({});
  
  if (!props) {
    // Handle the case where props is not defined
    return null;
  }

  // Initialize state for each field
  Object.keys(props).forEach((field) => {
    if (!fieldValues[field]) {
      // Initialize field value in the store
      setFieldValues(field, '');
    }
  });

  // Create effect to update result whenever field values change
  createEffect(() => {
    const joinedResult = Object.values(fieldValues)
      .map((value) => value) // Extract the values from the store
      .filter(Boolean) // Remove empty values
      .join(' ');

    // Set the result signal
    onResultChange(joinedResult);
  });

  return (
    <>
      {Object.entries(props).map(([field, label]) => (
        <>
          <label for={field}>{label}:</label>
          <input
            type="text"
            id={field}
            value={fieldValues[field]}
            onInput={(e) => setFieldValues(field, e.target.value)}
          />
        </>
      ))}
    </>
  );
}

export default JoinFields;