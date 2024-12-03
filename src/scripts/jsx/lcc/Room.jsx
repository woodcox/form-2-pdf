import { Show, createEffect, createSignal  } from 'solid-js';
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

const Room = (props) => {

  return (
    <>
      <Show 
        when={pdfState.CeremonyVenue === 'Civic Hall'}
      >
        <Radio label={props.label} componentId={props.componentId} options={props.options} onChange={props.onChange}/>
      </Show>
    </>
  );
};

export default Room;
