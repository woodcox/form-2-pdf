import { createSignal } from 'solid-js';


export function DateInput(props) {

  const [day, setDay] = createSignal('');
  const [month, setMonth] = createSignal('');
  const [year, setYear] = createSignal('');


  function formatDate() {
    const dayValue = day() || '';
    const monthValue = month() || '';
    const yearValue = year() || '';


    if (dayValue === '' || monthValue === '' || yearValue === '') {
      return ''; // Return an empty string if any value is null
    }

    const date = new Date(yearValue, monthValue - 1, dayValue);

    const options = {
      weekday: 'long', // Full day of the week (e.g., "Saturday")
      day: 'numeric', // Day of the month (e.g., "3")
      month: 'long', // Full month name (e.g., "February")
      year: 'numeric', // Full year (e.g., "2024")
      // dayPeriod: 'long', // AM/PM (not needed for this format)
    };

    return new Intl.DateTimeFormat('en-UK', options).format(date);
  }

  function formatDate() {
    const dayValue = day() || '';
    const monthValue = month() || '';
    const yearValue = year() || '';

    if (dayValue === '' || monthValue === '' || yearValue === '') {
        return ''; // Return an empty string if any value is null
    }

    const date = new Date(yearValue, monthValue - 1, dayValue);

    const options = {
        weekday: 'long', // Full day of the week (e.g., "Saturday")
        day: 'numeric', // Day of the month (e.g., "3")
        month: 'long', // Full month name (e.g., "February")
        year: 'numeric', // Full year (e.g., "2024")
        // dayPeriod: 'long', // AM/PM (not needed for this format)
    };

    return new Intl.DateTimeFormat('en-UK', options).format(date);
  }

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
      <div>
        <label for="date-input-date">Date:</label>
        <input
          id="date-input-date"
          name="date-input-date"
          type="text"
          value={formatDate()}
          readonly
        />
      </div>
    </fieldset>
  );
}
