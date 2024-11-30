import { createSignal, createEffect } from 'solid-js';
import { makePersisted } from './makePersisted.jsx';

const [day, setDay] = makePersisted(createSignal(''), {name: "day"});
const [month, setMonth] = makePersisted(createSignal(''), {name: "month"});
const [year, setYear] = makePersisted(createSignal(''), {name: "year"});

export default function DateInput(props) {
  // Create an effect that runs whenever day(), month(), or year() changes
  createEffect(() => {
    const dayValue = day();
    const monthValue = month();
    const yearValue = year();

    // pdfState stays empty string until all field filled in
    if (dayValue === '' || monthValue === '' || yearValue === '') {
      props.onChange('');
      return;
    }

    const date = new Date(yearValue, monthValue - 1, dayValue);

    const options = {
      weekday: 'long', // Full day of the week (e.g., "Saturday")
      day: 'numeric', // Day of the month (e.g., "3")
      month: 'long', // Full month name (e.g., "February")
      year: 'numeric', // Full year (e.g., "2024")
    };

    // TO DO: add date validation date-fns?
    const formattedDate = new Intl.DateTimeFormat('en-UK', options).format(
      date
    );

    // Notify the parent component about the updated pdfState
    props.onChange(formattedDate);
  });

  return (
    <div class="govuk-form-group">
      <fieldset
        class="govuk-fieldset"
        role="group"
        aria-describedby={`${props.name}-help-text`}
      >
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--2">
          <h3>{props.heading}</h3>
        </legend>
        <div class="govuk-hint" id={`${props.name}-help-text`}>
          {props.helpText}
        </div>
        <div class="govuk-date-input" id={props.name}>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label
                class="govuk-label govuk-date-input__label"
                for={`${props.name}-day`}
              >
                Day
              </label>
              <input
                class="govuk-input govuk-date-input__input govuk-input--width-2"
                id={`${props.name}-day`}
                name={`${props.name}-day`}
                type="text"
                inputmode="numeric"
                maxlength="2"
                min="1"
                max="31"
                onInput={(e) => setDay(e.target.value)}
                value={day()}
              />
            </div>
          </div>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label
                class="govuk-label govuk-date-input__label"
                for={`${props.name}-month`}
              >
                Month
              </label>
              <input
                class="govuk-input govuk-date-input__input govuk-input--width-2"
                id={`${props.name}-month`}
                name={`${props.name}-month`}
                type="text"
                inputmode="numeric"
                maxlength="2"
                min="1"
                max="12"
                onInput={(e) => setMonth(e.target.value)}
                value={month()}
              />
            </div>
          </div>
          <div class="govuk-date-input__item">
            <div class="govuk-form-group">
              <label
                class="govuk-label govuk-date-input__label"
                for={`${props.name}-year`}
              >
                Year
              </label>
              <input
                class="govuk-input govuk-date-input__input govuk-input--width-4"
                id={`${props.name}-year`}
                name={`${props.name}-year`}
                type="text"
                inputmode="numeric"
                maxlength="4"
                min="2000"
                max="2199"
                onInput={(e) => setYear(e.target.value)}
                value={year()}
              />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
