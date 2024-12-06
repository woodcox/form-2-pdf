import { createSignal, onMount, onCleanup } from 'solid-js';
import accessibleAutocomplete from 'accessible-autocomplete/dist/accessible-autocomplete.min.js';
import { makePersisted } from './makePersisted.jsx';

/**
 * This accessible-autocomplete component does not work well with solid-js. The internal js does not seem to work well with signals.
 * 
 * May need to look at either converting the library to solid-js (as there is a react version) or look at other optons for an autocomplete such as https://kobalte.dev/docs/core/components/combobox then style it to look like the GOV.UK
 */

const [autocompleteValue, setAutocompleteValue] = makePersisted(createSignal(''), {name: "autocomplete"});

const Autocomplete = (props) => {
  let containerRef;
  let inputElement;

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  const syncInputValue = () => {
    if (inputElement) {
      inputElement.value = autocompleteValue() || ''; // Sync the input field with the persisted state
    }
  };

  onMount(() => {
    if (containerRef) {
      accessibleAutocomplete({
        element: containerRef,
        id: props.name,
        source: props.options,
        defaultValue: autocompleteValue() || '', // Use persisted value as default
        showAllValues: true,
        onConfirm: (val) => {
          setAutocompleteValue(val); // Persist the confirmed value
          console.log('selected (onConfirm):', autocompleteValue());
          props.onChange && props.onChange(val); // Notify parent
        },
      });

      // Store a reference to the generated input element
      inputElement = containerRef.querySelector('input');

      if (inputElement) {
        // Set initial value
        syncInputValue();

        // Listen to blur event to persist manual edits
        inputElement.addEventListener('blur', () => {
          setAutocompleteValue(inputElement.value);
          props.onChange && props.onChange(inputElement.value);
          console.log('blur (manual input):', autocompleteValue());
        });
      }
    } else {
      console.error('containerRef is not defined');
    }
  });

  // Cleanup event listeners on component unmount
  onCleanup(() => {
    if (inputElement) {
      inputElement.removeEventListener('blur', syncInputValue);
    }
  });

  return (
    <>
      <label for={props.name}>{props.label}</label>
      <div
        ref={(el) => (containerRef = el)}
        id={`${props.name}-container`}
      />
    </>
  );
};

export default Autocomplete;


/*
const Autocomplete = (props) => {
  let containerRef;

  onMount(() => {
    if (containerRef) {
      accessibleAutocomplete({
        element: containerRef,
        id: props.name,
        source: props.options,
        defaultValue: autocompleteValue() || '', // Use persisted value as default
        showAllValues: true,
        onConfirm: (val) => {
          setAutocompleteValue(val); // Persist the confirmed value
          console.log('selected:', autocompleteValue());
          props.onChange && props.onChange(val); // Notify parent
        },
      });

    } else {
      console.error('containerRef is not defined');
    }
  });

  return (
    <>
      <label for={props.name}>{props.label}</label>
      <div ref={(el) => (containerRef = el)}
        id={`${props.name}-container`}
        //value={props.value || autocompleteValue()}
        //onChange={handleChange}
      >
      </div>
    </>
  );
}

export default Autocomplete;*/
