import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { makePersisted } from './makePersisted.jsx';
import Accordion from './Accordion.jsx';
import { pdfState } from './../pdfme/pdfDefaultValues.jsx';

// Define a global object to store the state of all instances of the CeremonyWording
const globalWordsValues = {};

const CeremonyWords = (props) => {
  // Derive the store name from the componentId prop
  const storeName = `wordsValues_${props.componentId}`;

  // Check if the store for this component instance exists, if not, create a new one
  if (!globalWordsValues[storeName]) {
    globalWordsValues[storeName] = makePersisted(createStore({ value: '' }), {
      name: storeName,
    });
  }

  const [wordsState, setWordsState] = globalWordsValues[storeName];

  const handleChange = (e) => {
    setWordsState({ value: e.target.value });
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <>
      <Show
        when={pdfState.CeremonyType === 'Civil Partnership'}
        fallback={
          /* Marriage */
          <Accordion name={props.accordName} sections={props.marriage} />
        }
      >
        {/* Civil Partnership */}
        <Accordion name={props.accordName} sections={props.civilPartnership} />
      </Show>
      <div class="govuk-form-group">
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--2">
            <h3>{props.label}</h3>
          </legend>
          <div class="govuk-radios" data-module="govuk-radios">
            <For each={props.options}>
              {(option) => (
                <div class="govuk-radios__item">
                  <input
                    class="govuk-radios__input"
                    type="radio"
                    name={props.componentId}
                    id={option.id}
                    value={option.value}
                    checked={wordsState.value === option.value}
                    onChange={handleChange}
                  />
                  <label
                    class="govuk-label govuk-radios__label"
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

export default CeremonyWords;
