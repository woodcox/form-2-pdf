import { createSignal, createUniqueId } from 'solid-js';
import { onMount } from 'solid-js';
import accessibleAutocomplete from 'accessible-autocomplete/dist/accessible-autocomplete.min.js';

const [autocompleteValue, setAutocompleteValue] = createSignal('');

const Autocomplete = (props) => {
  let containerRef; // Reference to the container where the autocomplete will initialize

  const handleChange = (e) => {
    setAutocompleteValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  onMount(() => {
    // Ensure containerRef is set before calling accessibleAutocomplete
    if (containerRef) {
      accessibleAutocomplete.enhanceSelectElement({
        //...props, // Spread additional props like id, source, etc.
        defaultValue: props.value || '',
        selectElement: containerRef, // Attach autocomplete to this element
        onConfirm: (val) => {
          setAutocompleteValue(val); // Update signal with confirmed value
          props.onChange && props.onChange(val); // Notify parent component
        },
      });
    } else {
      console.error('containerRef is not defined');
    }
});

  return (
    <>
      <label for={props.name}>{props.label}</label>
      <select
        ref={(el) => (containerRef = el)}
        name={props.name}
        id={props.name}
        value={props.value || setAutocompleteValue()}
        onConfirm={handleChange}
      >
        <For each={props.options}>
          {(option) => <option value={option.value}>{option.label}</option>}
        </For>
      </select>
    </>
  );
}

export default Autocomplete;
