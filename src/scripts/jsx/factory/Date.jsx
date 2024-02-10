import { createSignal, createEffect } from 'solid-js';

const [day, setDay] = createSignal('');
const [month, setMonth] = createSignal('');
const [year, setYear] = createSignal('');

export default function getDate(props) {
  // Create an effect that runs whenever day(), month(), or year() changes
  createEffect(() => {
    const dayValue = day();
    const monthValue = month();
    const yearValue = year();

    // TO DO: as the data is now in the schema, this need reworking to show long date in the summary
    /*if (dayValue === '' || monthValue === '' || yearValue === '') {
      props.onChange((prevInputs) => ({
        ...prevInputs,
      }));
      return;
    }*/

    let result = '';
    if (yearValue && monthValue && dayValue) {
      result = `${yearValue.toString().padStart(4, '0')}-${monthValue
        .toString()
        .padStart(2, '0')}-${dayValue.toString().padStart(2, '0')}`;
      console.log('result:', result);
    } else {
      result = '';
    }

    const date = new Date(result);
    //const date = new Date(yearValue, monthValue - 1, dayValue);
    console.log('Date:', date);

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
    console.log('formattedDate:', formattedDate);

    // TO DO: as the data is now in the schema, this need reworking to show long date in the summary
    // Notify the parent component about the updated state
    onChange(formattedDate);
  });

  return (
    <fieldset role="group" aria-describedby={`${props.name}-help-text`}>
      <legend>
        <h2>{props.heading}</h2>
      </legend>
      <p>
        <strong id={`${props.name}-help-text`}>{props.helpText}</strong>
      </p>
      <div class="date-input-group-wrapper" id={props.name}>
        <div class="date-input-group">
          <label for={`${props.name}-day`}>Day</label>
          <input
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
        <div class="date-input-group">
          <label for={`${props.name}-month`}>Month</label>
          <input
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
        <div class="date-input-group">
          <label for={`${props.name}-year`}>Year</label>
          <input
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
    </fieldset>
  );
}
