import { createSignal } from 'solid-js';

const [radioValue, setRadioValue] = createSignal('');

const Radio = (props) => {
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <div class="govuk-form-group">
      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--2">
          <h2>{props.label}</h2>
        </legend>
        <div class="govuk-radios" data-module="govuk-radios">
          <For each={props.options}>
            {(option) => (
              <div class="govuk-radios__item">
                <input
                  class="govuk-radios__input"
                  type="radio"
                  name={option.name}
                  id={option.id}
                  value={option.value}
                  onChange={handleChange}
                />
                <label class="govuk-label govuk-radios__label" for={option.id}>
                  {option.value}
                </label>
              </div>
            )}
          </For>
        </div>
      </fieldset>
    </div>
  );
};

export default Radio;
