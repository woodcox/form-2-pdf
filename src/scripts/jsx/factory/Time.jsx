import { Show, Switch, Match  } from 'solid-js';
import Radio from './Radio.jsx';
import { pdfState } from './../pdfme/pdfDefaultValues.jsx';


const Time = (props) => {
  return (
    <>
        {/* Civic Hall - West Room Mon - Thur */}

        {/* Civic Hall - West Room Fri */}

        {/* Civic Hall - West Room Sat */}

        
      <Switch fallback={
        /* Licenced Venues */
        <Radio label={props.label} componentId={props.componentId} options={props.licencedVenue} />
        }>
        <Match when={pdfState.CeremonyVenue === 'Civic Hall'  && pdfState.CeremonyRoom === 'Banqueting Suite'}>
          {/* Civic Hall - Banqueting Suite */}
          <Radio label={props.label} componentId={props.componentId} options={props.banquetingSuiteOrFriWestRoom} />
        </Match>
        <Match when={pdfState.CeremonyVenue === 'Civic Hall' && pdfState.CeremonyRoom === 'West Room'}>
          <Radio label={props.label} componentId={props.componentId} options={props.civicHall} />
        </Match>
      </Switch>
    </>
  );
};

export default Time;
