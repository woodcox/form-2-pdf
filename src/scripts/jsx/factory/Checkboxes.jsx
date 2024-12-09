import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { makePersisted } from './makePersisted.jsx';

/* IMPORTANT - passing the onChange={props.onChange} is vital if your using the checkboxes component in a parent component
  Example:
  <Checkboxes 
    label={props.label}
    hintText={props.hintText} 
    componentId={props.componentId} 
    options={props.licencedVenue} 
    onChange={props.onChange}
  />
  */

// Define a global object to store the state of all instances of Checkboxes
const globalCheckboxValues = {};

const Checkboxes = (props) => {
  // Derive the store name from the componentId prop
  const storeName = `checkboxValues_${props.componentId}`;

  // Check if the store for this component instance exists, if not, create a new one
  if (!globalCheckboxValues[storeName]) {
    globalCheckboxValues[storeName] = makePersisted(
      createStore({ values: [] }),  // Use an array to store selected values
      { name: storeName }
    );
  }

  const [checkboxState, setCheckboxState] = globalCheckboxValues[storeName];

  const handleChange = (e) => {
    const value = e.target.value;

    // Toggle the value in the array
    setCheckboxState('values', (currentValues) =>
      e.target.checked
        ? [...currentValues, value] // Add value if checked
        : currentValues.filter((v) => v !== value) // Remove value if unchecked
    );

    props.onChange && props.onChange(checkboxState.values.join(', ')); // use join() method to convert the state to a string for the parent (in the Question component) onChange handler 
  };

  return (
    <>
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset" aria-describedby="waste-hint">
          <legend class="govuk-fieldset__legend">{props.label}</legend>
          <Show when={props.hintText}>
            <div id={`${props.name}-hint-text`} class="govuk-hint">
              {props.hintText}
            </div>
          </Show>
          <div class="govuk-checkboxes" data-module="govuk-checkboxes">
            <For each={props.options}>
              {(option) => (
                <div class="govuk-checkboxes__item">
                  <input
                    class="govuk-checkboxes__input"
                    type="checkbox"
                    id={option.id}
                    name={props.componentId}
                    value={option.value}
                    checked={checkboxState.values?.includes(option.value)}
                    onChange={handleChange}
                  />
                  <label
                    class="govuk-label govuk-checkboxes__label"
                    for={option.id}
                  >
                    {option.value}
                  </label>
                </div>
              )}
            </For>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Checkboxes;
