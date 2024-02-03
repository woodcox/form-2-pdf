import { createSignal, createEffect } from 'solid-js';

const [day, setDay] = createSignal('');
const [month, setMonth] = createSignal('');
const [year, setYear] = createSignal('');

export function DateInput(props) {
  
  // Create an effect that runs whenever day(), month(), or year() changes
  createEffect(() => {
    const dayValue = day();
    const monthValue = month();
    const yearValue = year();

    if (dayValue === '' || monthValue === '' || yearValue === '') {
      props.onInputsChange((prevInputs) => ({
        ...prevInputs,
        CeremonyDate: '',
      }));
      return; // Return if any value is null
    }

    const date = new Date(yearValue, monthValue - 1, dayValue);

    const options = {
      weekday: 'long', // Full day of the week (e.g., "Saturday")
      day: 'numeric', // Day of the month (e.g., "3")
      month: 'long', // Full month name (e.g., "February")
      year: 'numeric', // Full year (e.g., "2024")
    };

    const formattedDate = new Intl.DateTimeFormat('en-UK', options).format(date);

    // Notify the parent component about the updated state
    props.onInputsChange((prevInputs) => ({
      ...prevInputs,
      CeremonyDate: formattedDate,
    }));
  });

  return (
    <fieldset role="group" aria-describedby="date-input-help-text">
      <legend>
        <h2>{props.heading}</h2>
      </legend>
      <p>
        <strong id="date-input-help-text">For example, 27 3 2024</strong>
      </p>
      <div class="date-input-group-wrapper" id="date-input">
        <div class="date-input-group">
          <label for="date-input-day">Day</label>
          <input
            id="date-input-day"
            name="date-input-day"
            type="text"
            inputmode="numeric"
            maxlength="2"
            min="1"
            max="31"
            onInput={(e) => setDay(e.target.value)}
            value={day()}
          />
        </div>
        <div class="date-input-group">
          <label for="date-input-month">Month</label>
          <input
            id="date-input-month"
            name="date-input-month"
            type="text"
            inputmode="numeric"
            maxlength="2"
            min="1"
            max="12"
            onInput={(e) => setMonth(e.target.value)}
            value={month()}
          />
        </div>
        <div class="date-input-group">
          <label for="date-input-year">Year</label>
          <input
            id="date-input-year"
            name="date-input-year"
            type="text"
            inputmode="numeric"
            maxlength="4"
            min="2000"
            max="2099"
            onInput={(e) => setYear(e.target.value)}
            value={year()}
          />
        </div>
      </div>
    </fieldset>
  );
}
