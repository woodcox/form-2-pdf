import { createSignal } from 'solid-js';

const [radioValue, setRadioValue] = createSignal('');

const Radio = (props) => {
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <fieldset>
      <legend>
        <h2>{props.label}</h2>
      </legend>
      <For each={props.options}>
        {(option) => (
          <>
            <input
              type="radio"
              name={option.name}
              id={option.id}
              value={option.value}
              onChange={handleChange}
            />
            <label for={option.id}>{option.value}</label>
          </>
        )}
      </For>
    </fieldset>
  );
};

export default Radio;
