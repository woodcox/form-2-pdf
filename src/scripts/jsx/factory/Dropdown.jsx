import { createSignal } from 'solid-js';

const [selectedValue, setSelectedValue] = createSignal('');

const Dropdown = (props) => {
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <div class="govuk-form-group">
      <label class="govuk-label" for={props.name}>{props.label}</label>
      <select class="govuk-select"
        name={props.name}
        id={props.name}
        value={props.value}
        checked={selectedValue() === props.value}
        onChange={handleChange}
      >
        <option value="" selected disabled>
          {props.initialOption}
        </option>
        <For each={props.options}>
          {(option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};

export default Dropdown;