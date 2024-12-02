import { For, Show, createEffect, createUniqueId } from 'solid-js';
import { createStore } from 'solid-js/store';
//import { makePersisted } from './makePersisted.jsx';

// Capitalise the first letter of a string. This is used in the AddAnother component to adjust the {prop.title}.
function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Define a global object to store the state of all instances of AddAnotherParent
const globalParentValues = {};

function AddAnotherParent(props) {
  /* Conditionslly render if the first group of fields is visible based on the visible prop passed into the component.
  Example:
  <AddAnotherParent
    title="parent"
    grammar="Your"
    visible=true   // If true render the first field group, if null or false don't render the fields
    hintText="For example, your mother, father or parent"
  />
  */

  
  // Derive the store name from the componentId prop
  const storeName = `parentValues_${props.componentId}`;

  // Check if the store for this component instance exists, if not, create a new one
  if (!globalParentValues[storeName]) {
    globalParentValues[storeName] = createStore({ inputValues: [], });
  }

  const [parentInput, setParentInput] = globalParentValues[storeName];

  let newInputRef = null;
  const generateId = () => createUniqueId();

   // Fields to be initialized for each addAnother component
   const defaultInputs = {
    fullName: '',
    isAlive: '',
    jobTitle: '',
    isRetired: '',
  };

  // Add a new parent
  const addItem = () => {
    if (parentInput.inputValues.length < 2) {
      setParentInput('inputValues', (prev) => [
        ...prev,
        {
          id: generateId(),
          ...defaultInputs,
        },
      ]);

      setTimeout(() => {  
        // Set focus 
        if (newInputRef) {
          newInputRef.focus();
        }
      }, 0);
    }
  };

  // Remove a parent by ID
  const removeItem = (id) => {
    setParentInput('inputValues', (prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Handle field updates
  const updateField = (id, field, value) => {
    setParentInput('inputValues', (item) => item.id === id, field, value);
  };

  let initialRender = false; // Track the initial render for when props.visible = true so the Parent 1 details can still be removed from the dom if the client wishes

  createEffect(() => {
    // If inputValues already exist in the store
    if (
      parentInput.inputValues.length > 0 &&
      parentInput.inputValues.some((item) => item.fullName.trim() !== "")
    ) {
      /*
      console.log(
        "Inputs already have values:",
        parentInput.inputValues.map((item, index) => ({
          [`Parent ${index + 1}`]: item,
        }))
      );*/
      return; // Exit if inputs already have values
    }

    // Initialize default values only if no inputValues exist and it's the first render
    if (!initialRender && props.visible && parentInput.inputValues.length === 0) {
      setParentInput("inputValues", [
        { id: generateId(), ...defaultInputs },
      ]);
      initialRender = true; // Mark initialization as complete
      return;
    }
  });

  createEffect(() => {
    const inputLength = parentInput.inputValues.length;

    const joinedResult = parentInput.inputValues
      .map((item, index) => {
        const namePart = `${item.fullName} ${
          item.isAlive === "(deceased)" ? "(deceased)" : ""
        }`.trim();

        const jobPart = `${item.jobTitle} ${
          item.isRetired === "(retired)" ? "(retired)" : ""
        }`.trim();

        // Include "and" only for the first parent if there are multiple parents
        const formattedJobPart = index === 0 && inputLength > 1 ? `${jobPart} and` : jobPart;

      return namePart
        ? `${namePart}, ${formattedJobPart}` // Include comma if namePart is not empty
        : formattedJobPart; // No comma if namePart is empty
    })
    .filter(Boolean) // Remove empty strings
    .join("\n"); // Join each parent on a new line

  // Call the parent's onChange handler with the result
  props.onChange(joinedResult);
  });
  


  return (
    <div>
      <For each={parentInput.inputValues}>
        {(item, index) => (
          <div key={item.id} class="govuk-form-group">
            <h2>
              {props.grammar} {props.title} {index() + 1}
            </h2>
            <div id="parents-hint" class="govuk-hint">
              {props.hintText}
            </div>

            {/* Full Name Input */}
            <div class="govuk-form-group">
              <label
                for={`input-${item.id}-${props.title}-name`}
                class="govuk-label"
              >
                {capFirstLetter(props.title)} {index() + 1} full name
              </label>
              <input
                id={`input-${item.id}-${props.title}-name`}
                class="govuk-input"
                type="text"
                value={item.fullName}
                ref={(el) => {
                  if (index() === parentInput.inputValues.length - 1) newInputRef = el;
                }}
                onChange={(e) => updateField(item.id, "fullName", e.target.value)}
              />
            </div>

            {/* Is Alive Radio Buttons */}
            <div class="govuk-form-group">
              <fieldset class="govuk-fieldset">
                <legend class="govuk-fieldset__legend govuk-fieldset__legend">
                  Is {props.title} {index() + 1} alive?
                </legend>
                <div class="govuk-radios">
                  <div class="govuk-radios__item">
                    <input
                      class="govuk-radios__input"
                      type="radio"
                      name={`input-${item.id}-${props.title}-isAlive`}
                      value="alive"
                      checked={item.isAlive === "alive"}
                      onChange={(e) =>
                        updateField(item.id, "isAlive", e.target.value)
                      }
                    />
                    <label class="govuk-label govuk-radios__label">
                      Yes, they are alive
                    </label>
                  </div>
                  <div class="govuk-radios__item">
                    <input
                      class="govuk-radios__input"
                      type="radio"
                      name={`input-${item.id}-${props.title}-isAlive`}
                      value="(deceased)"
                      checked={item.isAlive === "(deceased)"}
                      onChange={(e) =>
                        updateField(item.id, "isAlive", e.target.value)
                      }
                    />
                    <label class="govuk-label govuk-radios__label">
                      No, they have died
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Job Title Input (Conditional === Died) */}
            <Show when={item.isAlive === "(deceased)"}>
              <div class="govuk-form-group">
                <label
                  for={`input-${item.id}-${props.title}-job`}
                  class="govuk-label"
                >
                  {capFirstLetter(props.title)} {index() + 1}'s last job
                </label>
                <input
                  id={`input-${item.id}-${props.title}-job`}
                  class="govuk-input"
                  type="text"
                  value={item.jobTitle}
                  onChange={(e) => updateField(item.id, "jobTitle", e.target.value)}
                />
              </div>

              {/* Retired radio buttons (Conditional === Died) */}
              <div class="govuk-form-group">
                <fieldset class="govuk-fieldset">
                  <legend class="govuk-fieldset__legend govuk-fieldset__legend">
                    {`Had ${props.title} ${index() + 1} retired before they died?`}
                  </legend>
                  <div class="govuk-radios" data-module="govuk-radios">
                    <div class="govuk-radios__item">
                      <input
                        class="govuk-radios__input"
                        type="radio"
                        name={`input-${item.id}-${props.title}-isRetired`}
                        id={`input-${item.id}-${props.title}-isRetired`}
                        value="(retired)"
                        checked={item.isRetired === '(retired)'}
                        onChange={(e) =>
                          updateField(item.id, 'isRetired', e.target.value)
                        }
                      />
                      <label
                        class="govuk-label govuk-radios__label"
                        for={`input-${item.id}-${props.title}-isRetired`}
                      >
                        Yes, they retired
                      </label>
                    </div>
                    <div class="govuk-radios__item">
                      <input
                        class="govuk-radios__input"
                        id={`input-${item.id}-${props.title}-isRetired-2`}
                        name={`input-${item.id}-${props.title}-isRetired`}
                        type="radio"
                        value="No"
                        checked={item.isRetired === 'No'}
                        onChange={(e) =>
                          updateField(item.id, 'isRetired', e.target.value)
                        }
                      />
                      <label
                        class="govuk-label govuk-radios__label"
                        for={`input-${item.id}-${props.title}-isRetired-2`}
                      >
                        No
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </Show>

            {/* Job Title Input (Conditional === Alive) */}
            <Show when={item.isAlive === "alive"}>
              <div class="govuk-form-group">
                <label
                  for={`input-${item.id}-${props.title}-job`}
                  class="govuk-label"
                >
                  {capFirstLetter(props.title)} {index() + 1}'s current or last job
                </label>
                <input
                  id={`input-${item.id}-${props.title}-job`}
                  class="govuk-input"
                  type="text"
                  value={item.jobTitle}
                  onChange={(e) => updateField(item.id, "jobTitle", e.target.value)}
                />
              </div>

              {/* Retired radio buttons (Conditional === Alive) */}
              <div class="govuk-form-group">
                <fieldset class="govuk-fieldset">
                  <legend class="govuk-fieldset__legend govuk-fieldset__legend">
                    {`Is ${props.title} ${index() + 1} retired?`}
                  </legend>
                  <div class="govuk-radios" data-module="govuk-radios">
                    <div class="govuk-radios__item">
                      <input
                        class="govuk-radios__input"
                        type="radio"
                        name={`input-${item.id}-${props.title}-isRetired`}
                        id={`input-${item.id}-${props.title}-isRetired`}
                        value="(retired)"
                        checked={item.isRetired === '(retired)'}
                        onChange={(e) =>
                          updateField(item.id, 'isRetired', e.target.value)
                        }
                      />
                      <label
                        class="govuk-label govuk-radios__label"
                        for={`input-${item.id}-${props.title}-isRetired`}
                      >
                        Yes, they retired
                      </label>
                    </div>
                    <div class="govuk-radios__item">
                      <input
                        class="govuk-radios__input"
                        id={`input-${item.id}-${props.title}-isRetired-2`}
                        name={`input-${item.id}-${props.title}-isRetired`}
                        type="radio"
                        value="No"
                        checked={item.isRetired === 'No'}
                        onChange={(e) =>
                          updateField(item.id, 'isRetired', e.target.value)
                        }
                      />
                      <label
                        class="govuk-label govuk-radios__label"
                        for={`input-${item.id}-${props.title}-isRetired-2`}
                      >
                        No
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </Show>

            {/* Remove Button */}
            <div class="govuk-button-group">
              <button
                type="button"
                class="govuk-button govuk-button--secondary"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </For>

      {/* Add Button */}
      <Show when={parentInput.inputValues.length < 2}>
        <button type="button" class="govuk-button" onClick={addItem}>
          Add {props.title}
        </button>
      </Show>
    </div>
  );
}

export default AddAnotherParent;