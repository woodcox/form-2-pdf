import { createSignal } from 'solid-js';
import { makePersisted } from './makePersisted.jsx';

const [selectedValue, setSelectedValue] = makePersisted(createSignal(''), {name: "select"});

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
        value={props.value || selectedValue()}
        onChange={handleChange}
      >
        <For each={props.options}>
          {(option) => (
            <option key={option.value} value={option.value} disabled={option.placeholder}>
              {option.label}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};

export default Dropdown;