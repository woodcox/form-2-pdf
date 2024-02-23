import { createSignal } from 'solid-js';

const [selectedValue, setSelectedValue] = createSignal('');

const Dropdown = (props) => {
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <>
      <label for={props.name}>{props.label}</label>
      <select
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={handleChange}
      >
        <option value="" selected disabled hidden>
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
    </>
  );
};

export default Dropdown;