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
  const [getThu, setThu] = createSignal(false);
  const [getClosed, setClosed] = createSignal(false);

  createEffect(() => {
    const ceremonyDate = pdfState['Ceremony date'] || ""; // Handles undefined gracefully
    setFriday(ceremonyDate.includes("Friday"));
    setSat(ceremonyDate.includes("Saturday"));
    setThu(ceremonyDate.includes("Thursday"));
    setMidWeek(["Monday", "Tuesday"].some((day) =>
      ceremonyDate.includes(day)
    ));
    setClosed(["Wednesday", "Sunday"].some((day) =>
      ceremonyDate.includes(day)
    ));
  });

  return (
    <>
      <Switch>
        {/* Licenced Venue */}
        <Match when={pdfState['Ceremony venue'] !== 'Civic Hall' && pdfState['Ceremony venue'] !== ''}>
          <Radio label={props.label} componentId={props.componentId} options={props.licencedVenue} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - Banqueting Suite - Sat*/}
        <Match when={pdfState['Ceremony venue'] === 'Civic Hall' && pdfState['Ceremony room'] === 'Banqueting Suite' && getSat() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.banquetingSuiteOrFriWestRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - Banqueting Suite - Sat*/}
        <Match when={pdfState['Ceremony venue'] === 'Civic Hall' && pdfState['Ceremony room'] === 'Banqueting Suite' && getSat() === false}>
          <p>Ceremonies only take place in the Banqueting Suite on a Saturday. Please check the date.</p>
        </Match>

        {/* Civic Hall - West Room Sat */}
        <Match when={pdfState['Ceremony venue'] === 'Civic Hall' && pdfState['Ceremony room'] === 'West Room' && getSat() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.satWestRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - West Room Fri */}
        <Match when={pdfState['Ceremony venue'] === 'Civic Hall' && pdfState['Ceremony room'] === 'West Room' && getFriday() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.banquetingSuiteOrFriWestRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - West Room Mon - Tues */}
        <Match when={pdfState['Ceremony venue'] === 'Civic Hall' && pdfState['Ceremony room'] === 'West Room' && midWeek() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.westRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - West Room Thurs */}
        <Match when={pdfState['Ceremony venue'] === 'Civic Hall' && pdfState['Ceremony room'] === 'West Room' && getThu() === true}>
          <Radio label={props.label} componentId={props.componentId} options={props.thuWestRoom} onChange={props.onChange}/>
        </Match>

        {/* Civic Hall - Wednesday or Sunday */}
        <Match when={pdfState['Ceremony venue'] === 'Civic Hall' && getClosed() === true}>
          <p>Ceremonies do not take place at the Civic Hall on a Wednesday or a Sunday. Please check the date.</p>
        </Match>
      </Switch>
    </>
  );
};

export default Time;
