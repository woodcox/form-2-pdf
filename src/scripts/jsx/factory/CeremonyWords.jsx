import { Show } from 'solid-js';
import Accordion from './Accordion.jsx';
import Radio from './Radio.jsx';
import { pdfState } from './../pdfme/pdfDefaultValues.jsx';

/* IMPORTANT - passing the onChange={props.onChange} is vital if your using the radio component in a Time parent component
  Example:
  <Radio 
    label={props.label} 
    componentId={props.componentId} 
    options={props.licencedVenue} 
    onChange={props.onChange}
  />
  */

const CeremonyWords = (props) => {

  return (
    <>
      <Show
        when={pdfState.CeremonyType === 'Civil Partnership'}
        fallback={
          /* Marriage */
          <Accordion name={props.accordName} sections={props.marriage} />
        }
      >
        {/* Civil Partnership */}
        <Accordion name={props.accordName} sections={props.civilPartnership} />
      </Show>
      <Radio label={props.label} componentId={props.componentId} options={props.options} onChange={props.onChange}/>
    </>
  );
};

export default CeremonyWords;
