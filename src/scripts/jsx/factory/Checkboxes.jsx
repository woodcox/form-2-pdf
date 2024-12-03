import { For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { makePersisted } from './makePersisted.jsx';

/* IMPORTANT - passing the onChange={props.onChange} is vital if your using the checkboxes component in a parent component
  Example:
  <Checkboxes 
    label={props.label} 
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
      createStore({ value: '' }),
      { name: storeName }
    );
  }

  const [checkboxState, setCheckboxState] = globalCheckboxValues[storeName];

  const handleChange = (e) => {
    setCheckboxState({ value: e.target.value });
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <>
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset" aria-describedby="waste-hint">
          <legend class="govuk-fieldset__legend">{props.label}</legend>
          <div id="waste-hint" class="govuk-hint">
            {props.hintText}
          </div>
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
                    checked={checkboxState.value === option.value}
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
