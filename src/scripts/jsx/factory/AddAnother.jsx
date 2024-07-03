import { createSignal, For, Show, onCleanup } from 'solid-js';
import { makePersisted } from './makePersisted.jsx';

// Capitalise the first letter of a string. This is used in the AddAnother component to adjust the {prop.title}.
function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function AddAnother(props) {
  /* Conditionslly render if the first group of fields is visible based on the visible prop passed into the component.
  Example:
  <AddAnother
    title="parent"
    grammar="Your"
    visible={true}   // If true render the first field group, if null or false don't render the fields
  />
  */
  const [items, setItems] = createSignal(props.visible ? [{ id: 1, fields: { field1: '', field2: '', field3: '', field4: '' } }] : []);
  let nextId = 2;

  // Only add a max of 2 parents
  const addItem = () => {
    if (items().length < 2) {
      setItems([...items(), { id: nextId++, fields: { field1: '', field2: '', field3: '', field4: '' } }]);
    }
  };

  const removeItem = (id) => {
    setItems(items().filter(item => item.id !== id));
  };

  const handleChange = (id, field, newValue) => {
    setItems(items().map(item => 
      item.id === id 
        ? { ...item, fields: { ...item.fields, [field]: newValue } } 
        : item
    ));
  };
  
  return (
    <div>
      <For each={items()}>
        {(item, index) => (
          <div key={item.id} class="govuk-form-group">
            <h2>{props.grammar} {props.title} {index() + 1}</h2>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field1`} class="govuk-label">{capFirstLetter(props.title)} {index() + 1} Full Name</label>
              <input
                id={`input-${item.id}-field1`}
                class="govuk-input"
                type="text"
                value={item.fields.field1}
                on:Change={(e) => handleChange(item.id, 'field1', e.target.value)}
              />
            </div>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field2`} class="govuk-label">Is {props.title} {index() + 1} alive?</label>
              <input
                id={`input-${item.id}-field2`}
                class="govuk-input"
                type="text"
                value={item.fields.field2}
                on:Change={(e) => handleChange(item.id, 'field2', e.target.value)}
              />
            </div>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field3`} class="govuk-label">{capFirstLetter(props.title)} {index() + 1}'s current or last job</label>
              <input
                id={`input-${item.id}-field3`}
                class="govuk-input"
                type="text"
                value={item.fields.field3}
                on:Change={(e) => handleChange(item.id, 'field3', e.target.value)}
              />
            </div>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field4`} class="govuk-label">Is {props.title} {index() + 1} retired?</label>
              <input
                id={`input-${item.id}-field4`}
                class="govuk-input"
                type="text"
                value={item.fields.field4}
                on:Change={(e) => handleChange(item.id, 'field4', e.target.value)}
              />
            </div>
            <div class="govuk-button-group">
              <button type="button" class="govuk-button govuk-button--secondary" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        )}
      </For>
      {/* Hide Add button if there are 2 parents already added */}
      <Show when={items().length < 2}>
        <button type="button" class="govuk-button" onClick={addItem}>Add {props.title}</button>
      </Show>
    </div>
  );
}

export default AddAnother;
