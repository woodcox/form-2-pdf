import { createSignal } from 'solid-js';

export default function DateInput() {
  const [day, setDay] = createSignal('');
  const [month, setMonth] = createSignal('');
  const [year, setYear] = createSignal('');

  function formatDate() {
    const date = new Date(year(), month() - 1, day());
    return date.toLocaleDateString();
  }

  return (
    <fieldset role="group" aria-describedby="date-input-help-text">
      <legend>
        <h1>When was your passport issued?</h1>
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
            onInput={(e) => setMonth(e.target.value)}
            value={month()}
          />
        </div>
        <div class="date-input-group">
          <label for="date-input-year">Year</label>
          <input
            class="govuk-input govuk-date-input__input govuk-input--width-4"
            id="date-input-year"
            name="date-input-year"
            type="text"
            inputmode="numeric"
            onInput={(e) => setYear(e.target.value)}
            value={year()}
          />
        </div>
      </div>
      <div>
        <label for="date-input-date">Date</label>
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
