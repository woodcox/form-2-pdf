import { createSignal, createEffect } from 'solid-js';

// TO DO: work out how to preserve the state of the value signal and result signal
// Probably need to lift them out of the function in a way that does not break the function
let fieldStates = {};

function JoinFields({ props, onResultChange }) {
  if (!props) {
    // Handle the case where props is not defined
    return null;
  }

  Object.keys(props).forEach((field) => {
    const [value, setValue] = createSignal('');
    fieldStates[field] = { value, setValue };
  });

  const [result, setResult] = createSignal('');

  createEffect(() => {
    const joinedResult = Object.values(fieldStates)
      .map(({ value }) => value()) // Extract the values from signals
      .filter(Boolean) // Remove empty values
      .join(' ');

    setResult(joinedResult);

    // Update the state in the parent component
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
            value={fieldStates[field].value()}
            onInput={(e) => fieldStates[field].setValue(e.target.value)}
          />
        </>
      ))}
    </>
  );
}

export default JoinFields;
