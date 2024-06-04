import { createSignal } from 'solid-js';

const [autocompleteValue, setAutocompleteValue] = createSignal('');

const Autocomplete = (props) => {
  const optionSets = {
    
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
      <select
        class="govuk-select"
        name={props.name}
        id={props.name}
        options={props.value }
        onChange={handleChange}
      />
    </div>
  );
};

export default Autocomplete;
