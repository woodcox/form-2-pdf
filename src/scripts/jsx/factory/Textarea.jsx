import { createSignal } from 'solid-js';
import { makePersisted } from './makePersisted.jsx';

const [textAreaValue, setTextAreaValue] = makePersisted(createSignal(''), {name: "textArea"});

const Textarea = (props) => {
  
  const handleChange = (e) => {
    setTextAreaValue(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <div class="govuk-form-group">
      <label class="govuk-label" for={props.name}>{props.label}</label>
      <textarea class="govuk-textarea"
        name={props.name}
        id={props.name}
        rows={props.rows}
        value={props.value || textAreaValue()}
        onChange={handleChange}
      >
      </textarea>
    </div>
  );
};

export default Textarea;