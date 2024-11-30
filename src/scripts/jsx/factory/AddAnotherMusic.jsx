import { For, Show, createEffect, createUniqueId } from 'solid-js';
import { createStore } from 'solid-js/store';
//import { makePersisted } from './makePersisted.jsx';

// Capitalise the first letter of a string. This is used in the AddAnother component to adjust the {prop.title}.
function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Define a global object to store the state of all instances of AddAnotherParent
const globalMusicValues = {};

function AddAnotherMusic(props) {
  /* Conditionslly render if the first group of fields is visible based on the visible prop passed into the component.
  Example:
  <AddAnotherMusic
    title="parent"
    musicSection="Your"
    visible=true   // If true render the first field group, if null or false don't render the fields
    hintText="For example, your mother, father or parent"
  />
  */

  
  // Derive the store name from the componentId prop
  const storeName = `musicValues_${props.componentId}`;

  // Check if the store for this component instance exists, if not, create a new one
  if (!globalMusicValues[storeName]) {
    globalMusicValues[storeName] = createStore({ inputValues: [], });
  }

  const [musicInput, setMusicInput] = globalMusicValues[storeName];

  let newInputRef = null;
  const generateId = () => createUniqueId();

   // Fields to be initialized for each addAnother component
   const defaultInputs = {
    songTitle: '',
    artist: '',
    isLive: '',
  };

  // Add a new music choice
  const addItem = () => {
    if (musicInput.inputValues.length < (props.songNumber || 1)) {
      setMusicInput('inputValues', (prev) => [
        ...prev,
        {
          id: generateId(),
          ...defaultInputs,
        },
      ]);

      setTimeout(() => {
        if (newInputRef) {
          newInputRef.focus();
        }
      }, 0);
    }
  };

  // Remove a parent by ID
  const removeItem = (id) => {
    setMusicInput('inputValues', (prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Handle field updates
  const updateField = (id, field, value) => {
    setMusicInput('inputValues', (item) => item.id === id, field, value);
  };

  let initialRender = false; // Track the initial render for when props.visible = true so the Parent 1 details can still be removed from the dom if the client wishes

  createEffect(() => {
    // If inputValues already exist in the store
    if (
      musicInput.inputValues.length > 0 &&
      musicInput.inputValues.some((item) => item.songTitle.trim() !== "")
    ) {
      /*
      console.log(
        "Inputs already have values:",
        musicInput.inputValues.map((item, index) => ({
          [`Parent ${index + 1}`]: item,
        }))
      );*/
      return; // Exit if inputs already have values
    }

    // Initialize default values only if no inputValues exist and it's the first render
    if (!initialRender && props.visible && musicInput.inputValues.length === 0) {
      setMusicInput("inputValues", [
        { id: generateId(), ...defaultInputs },
      ]);
      initialRender = true; // Mark initialization as complete
      return;
    }
  });

  
  createEffect(() => {
    const inputLength = musicInput.inputValues.length;

    const joinedResult = musicInput.inputValues
      .map((item, index) => {
        const titlePart = `${item.songTitle}`.trim();

        const artistPart = `${item.artist} ${
          item.isLive === "(live)" ? "(live music)" : ""
        }`.trim();

      return `${titlePart} - ${artistPart},` // Include comma if namePart is not empty
    })
    .filter(Boolean) // Remove empty strings
    .join("\n"); // Join each parent on a new line

  // Call the parent's onChange handler with the result
  props.onChange(joinedResult);
  });
  


  return (
    <div class="govuk-form-group">
      <h2>
        {props.musicSection}
      </h2>
      <div id="music-hint" class="govuk-hint">
        {props.hintText}
      </div>
      <For each={musicInput.inputValues}>
        {(item, index) => (
          <div key={item.id}>

            {/* Song Title Input */}
            <div class="govuk-form-group">
              <label
                for={`input-${item.id}-${props.title}-title`}
                class="govuk-label"
              >
                {capFirstLetter(props.title)} {index() + 1} title
              </label>
              <input
                id={`input-${item.id}-${props.title}-title`}
                class="govuk-input"
                type="text"
                value={item.songTitle}
                ref={(el) => {
                  if (index() === musicInput.inputValues.length - 1) newInputRef = el;
                }}
                onChange={(e) => updateField(item.id, "songTitle", e.target.value)}
              />
            </div>

            {/* Artist Input */}
            <div class="govuk-form-group">
              <label
                for={`input-${item.id}-${props.title}-artist`}
                class="govuk-label"
              >
                {capFirstLetter(props.title)} {index() + 1} artist
              </label>
              <input
                id={`input-${item.id}-${props.title}-artist`}
                class="govuk-input"
                type="text"
                value={item.artist}
                ref={(el) => {
                  if (index() === musicInput.inputValues.length - 1) newInputRef = el;
                }}
                onChange={(e) => updateField(item.id, "artist", e.target.value)}
              />
            </div>

            {/* Is live Radio Buttons */}
            <div class="govuk-form-group">
              <fieldset class="govuk-fieldset">
                <legend class="govuk-fieldset__legend govuk-fieldset__legend">
                  Will {props.title} {index() + 1} be played live?
                </legend>
                <div class="govuk-radios">
                  <div class="govuk-radios__item">
                    <input
                      class="govuk-radios__input"
                      type="radio"
                      name={`input-${item.id}-${props.title}-isLive`}
                      value="live"
                      checked={item.isLive === "live"}
                      onChange={(e) =>
                        updateField(item.id, "isLive", e.target.value)
                      }
                    />
                    <label class="govuk-label govuk-radios__label">
                      Yes, a singer or band will play the song live
                    </label>
                  </div>
                  <div class="govuk-radios__item">
                    <input
                      class="govuk-radios__input"
                      type="radio"
                      name={`input-${item.id}-${props.title}-isLive`}
                      value="(deceased)"
                      checked={item.isLive === "(deceased)"}
                      onChange={(e) =>
                        updateField(item.id, "isLive", e.target.value)
                      }
                    />
                    <label class="govuk-label govuk-radios__label">
                      No
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            
            {/* Remove Button */}
            <div class="govuk-button-group">
              <button
                type="button"
                class="govuk-button govuk-button--secondary"
                onClick={() => removeItem(item.id)}
              >
                Remove {props.title} {index() + 1}
              </button>
            </div>
          </div>
        )}
      </For>

      {/* Add Button */}
      <Show when={musicInput.inputValues.length < (props.songNumber || 1)}>
        <button type="button" class="govuk-button" onClick={addItem}>
          Add {props.title}
        </button>
      </Show>
    </div>
  );
}

export default AddAnotherMusic;