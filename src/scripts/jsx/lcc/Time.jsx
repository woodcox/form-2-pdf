import { Switch, Match, createEffect, createSignal  } from 'solid-js';
import Radio from './../factory/Radio.jsx';
import { pdfState } from './../pdfme/pdfDefaultValues.jsx';

/* IMPORTANT - passing the onChange={props.onChange} is vital if your using the radio component in a parent component
  Example:
  <Radio 
    label={props.label} 
    componentId={props.componentId} 
    options={props.licencedVenue} 
    onChange={props.onChange}
  />
  */

const Time = (props) => {

  const [getFriday, setFriday] = createSignal(false);
  const [getSat, setSat] = createSignal(false);
  const [midWeek, setMidWeek] = createSignal(false);
  const [getSun, setSun] = createSignal(false);

  createEffect(() => {
    const ceremonyDate = pdfState.CeremonyDate || ""; // Handles undefined gracefully
    setFriday(ceremonyDate.includes("Friday"));
    setSat(ceremonyDate.includes("Saturday"));
    setSun(ceremonyDate.includes("Sunday"));
    setMidWeek(["Monday", "Tuesday", "Thursday"].some((day) =>
      ceremonyDate.includes(day)
    ));
  });

  return (
    <>
      <Switch fallback={
        <>
          <legend class="govuk-fieldset__legend">
            What time is your ceremony?
          </legend>
          <p class="govuk-body">Please complete the venue, date and room (if applicable)</p>
        </>
        }>

        {/* Licenced Venue */}
        <Match when={pdfState.CeremonyVenue !== 'Civic Hall' && pdfState.CeremonyVenue !== ''}>
          <Radio label={props.label} componentId={props.componentId} options={props.licencedVenue} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - Banqueting Suite - Sat*/}
        <Match when={pdfState.CeremonyVenue === 'Civic Hall' && pdfState.CeremonyRoom === 'Banqueting Suite' && getSat() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.banquetingSuiteOrFriWestRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - Banqueting Suite - Sat*/}
        <Match when={pdfState.CeremonyVenue === 'Civic Hall' && pdfState.CeremonyRoom === 'Banqueting Suite' && getSat() === false}>
          <p>Ceremonies only take place in the Banqueting Suite on a Saturday. Please check the date.</p>
        </Match>

        {/* Civic Hall - West Room Sat */}
        <Match when={pdfState.CeremonyVenue === 'Civic Hall' && pdfState.CeremonyRoom === 'West Room' && getSat() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.satWestRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - West Room Fri */}
        <Match when={pdfState.CeremonyVenue === 'Civic Hall' && pdfState.CeremonyRoom === 'West Room' && getFriday() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.banquetingSuiteOrFriWestRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - West Room Mon - Thur */}
        <Match when={pdfState.CeremonyVenue === 'Civic Hall' && pdfState.CeremonyRoom === 'West Room' && midWeek() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.westRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - Sunday */}
        <Match when={pdfState.CeremonyVenue === 'Civic Hall' && getSun() === true}>
          <p>Ceremonies do not take place at the Civic Hall on a Sunday. Please check the date.</p>
        </Match>
      </Switch>
    </>
  );
};

export default Time;
