import { createSignal, createEffect } from 'solid-js';

function JoinFields({ props, onResultChange }) {
  if (!props) {
    // Handle the case where props is not defined
    return null;
  }

  const fieldStates = {};

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
