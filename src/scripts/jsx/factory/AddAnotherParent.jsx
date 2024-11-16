import { createSignal, For, Show, onCleanup, createEffect } from 'solid-js';
import { createStore } from "solid-js/store"
import { makePersisted } from './makePersisted.jsx';

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
    visible={true}   // If true render the first field group, if null or false don't render the fields
  />
  */

  // Initialize store
const [parentInput, setParentInput] = createStore({
  inputValues: [
    {
      id: 1,
      fullName: "",
      isAlive: "",
      jobTitle: "",
      isRetired: "",
    },
    {
      id: 2,
      fullName: "",
      isAlive: "",
      jobTitle: "",
      isRetired: "",
    }
  ]
})

const updateField = (id, field, value) => {
  setParentInput("inputValues", (item) => item.id === id, field, value);
};

  // Signal to render the number of parents to add
  const [items, setItems] = createSignal(
    props.visible
      ? [{ id: 1, fields: { fullName: '', isAlive: '', jobTitle: '', isRetired: '' } }]
      : []
  );
  let nextId = 2;
  // This is for setting focus to the new input fields when add (parent or step-parent) button is clicked
  let newInputRef = null;

  // Only add a max of 2 parents
  const addItem = () => {
    if (items().length < 2) {
      setItems([
        ...items(),
        {
          id: nextId++,
          fields: { fullName: '', isAlive: '', jobTitle: '', isRetired: '' },
        },
      ]);

      // Set a timeout to focus the new fullName input when add button is clicked
      setTimeout(() => {
        if (newInputRef) {
          newInputRef.focus();
        }
      }, 0);
    }
  };

  const removeItem = (id) => {
    setItems(items().filter((item) => item.id !== id));
  };

  const handleChange = (id, field, newValue) => {
    setItems(
      items().map((item) =>
        item.id === id
          ? { ...item, fields: { ...item.fields, [field]: newValue } }
          : item
      )
    );
    console.log('Updated items:', items());
  };

  createEffect(() => {
    console.log('Current state of items:', items());
  });

  return (
    <div>
      <For each={items()}>
        {(item, index) => (
          <div key={item.id} class="govuk-form-group">
            <h2>
              {props.grammar} {props.title} {index() + 1}
            </h2>
            <div id="parents-hint" class="govuk-hint">
              {props.hintText}
            </div>
            <div class="govuk-form-group">
              <label
                for={`input-${item.id}-${props.title}-name`}
                class="govuk-label"
              >
                {capFirstLetter(props.title)} {index() + 1} Full Name
              </label>
              <input
                id={`input-${item.id}-${props.title}-name`}
                class="govuk-input"
                type="text"
                value={parentInput.inputValues.find((i) => i.id === item.id)?.fullName || ""}
                ref={
                  (el) => {
                    if (index() === items().length - 1) newInputRef = el;
                  } /* The field to focus on when the add button is clicked */
                }
                on:Change={(e) =>
                  updateField(item.id, "fullName", e.target.value)}
              />
            </div>
            <div class="govuk-form-group">
              <fieldset class="govuk-fieldset">
                <legend class="govuk-fieldset__legend govuk-fieldset__legend">
                  Is {props.title} {index() + 1} alive?
                </legend>
                <div class="govuk-radios" data-module="govuk-radios">
                  <div class="govuk-radios__item">
                    <input
                      class="govuk-radios__input"
                      type="radio"
                      name={`input-${item.id}-${props.title}-isAlive`}
                      id={`input-${item.id}-${props.title}-isAlive`}
                      value="Yes, they are alive"
                      //checked={item.fields.isAlive === 'Yes, they are alive'}
                      on:Change={(e) =>
                        updateField(item.id, "isAlive", e.target.value)}
                    />
                    <label
                      class="govuk-label govuk-radios__label"
                      for={`input-${item.id}-${props.title}-isAlive`}
                    >
                      Yes, they are alive
                    </label>
                  </div>
                  <div class="govuk-radios__item">
                    <input
                      class="govuk-radios__input"
                      id={`input-${item.id}-${props.title}-isAlive-2`}
                      name={`input-${item.id}-${props.title}-isAlive`}
                      type="radio"
                      value="No, they have died"
                      //checked={item.fields.isAlive === 'No, they have died'}
                      on:Change={(e) =>
                        updateField(item.id, "isAlive", e.target.value)
                      }
                    />
                    <label
                      class="govuk-label govuk-radios__label"
                      for={`input-${item.id}-${props.title}-isAlive-2`}
                    >
                      No, they have died
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <Show
              when={() => item.fields.isAlive === 'No, they have died'}
              fallback={<div></div>}
            >
              <div class="govuk-form-group">
                <label
                  for={`input-${item.id}-${props.title}-job`}
                  class="govuk-label"
                >
                  {`${capFirstLetter(props.title)} ${
                    index() + 1
                  }'s currrent or last job`}
                </label>
                <input
                  id={`input-${item.id}-${props.title}-job`}
                  class="govuk-input"
                  type="text"
                  value={parentInput.inputValues.find((i) => i.id === item.id)?.jobTitle || ""}
                  on:Change={(e) =>
                    updateField(item.id, "jobTitle", e.target.value)
                  }
                />
              </div>
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
                        value="Yes"
                        //checked={item.fields.isRetired === 'Yes'}
                        on:Change={(e) =>
                          updateField(item.id, "isRetired", e.target.value)
                        }
                      />
                      <label
                        class="govuk-label govuk-radios__label"
                        for={`input-${item.id}-${props.title}-isRetired`}
                      >
                        Yes
                      </label>
                    </div>
                    <div class="govuk-radios__item">
                      <input
                        class="govuk-radios__input"
                        id={`input-${item.id}-${props.title}-isRetired-2`}
                        name={`input-${item.id}-${props.title}-isRetired`}
                        type="radio"
                        value="No"
                        //checked={item.fields.isRetired === 'No'}
                        on:Change={(e) =>
                          updateField(item.id, "isRetired", e.target.value)}
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
      {/* Hide Add button if there are 2 parents already added */}
      <Show when={items().length < 2}>
        <button type="button" class="govuk-button" onClick={addItem}>
          Add {props.title}
        </button>
      </Show>
    </div>
  );
}

export default AddAnotherParent;