import { createSignal } from 'solid-js';
import { Select, createOptions } from '@thisbeyond/solid-select';

const [autocompleteValue, setAutocompleteValue] = createSignal('');

const Autocomplete = (props) => {
  const optionSets = {
    [
      "apple", "banana", "pear", "pineapple", "kiwi"
    ]
  };
  const handleChange = (e) => {
    setAutocompleteValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <div class="govuk-form-group">
      <label class="govuk-label" for={props.name}>
        {props.label}
      </label>
      <Select
        class="govuk-select"
        name={props.name}
        id={props.name}
        options={props.value || optionSets[autocompleteValue()]}
        onChange={handleChange}
      />
    </div>
  );
};

export default Autocomplete;
