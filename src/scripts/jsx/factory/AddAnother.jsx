import { createSignal, For, Show, onCleanup } from 'solid-js';
import { makePersisted } from './makePersisted.jsx';

function AddAnother() {
  const [items, setItems] = createSignal([{ id: 1, fields: { field1: '', field2: '', field3: '', field4: '' } }]);
  let nextId = 2;

  const handleChange = (id, field, value) => {
    setItems(items => items.map(item => item.id === id ? { ...item, fields: { ...item.fields, [field]: value } } : item));
  };

  const addItem = () => {
    if (items().length < 4) {
      setItems([...items(), { id: nextId++, fields: { field1: '', field2: '', field3: '', field4: '' } }]);
    }
  };

  const removeItem = (id) => {
    setItems(items().filter(item => item.id !== id));
  };

  return (
    <div>
      <For each={items()}>
        {(item, index) => (
          <div key={item.id} class="govuk-form-group">
            <h2>Parent {index() + 1}</h2>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field1`} class="govuk-label">Field 1</label>
              <input
                id={`input-${item.id}-field1`}
                class="govuk-input"
                type="text"
                value={item.fields.field1}
                on:Change={(e) => handleChange(item.id, 'field1', e.target.value)}
              />
            </div>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field2`} class="govuk-label">Field 2</label>
              <input
                id={`input-${item.id}-field2`}
                class="govuk-input"
                type="text"
                value={item.fields.field2}
                on:Change={(e) => handleChange(item.id, 'field2', e.target.value)}
              />
            </div>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field3`} class="govuk-label">Field 3</label>
              <input
                id={`input-${item.id}-field3`}
                class="govuk-input"
                type="text"
                value={item.fields.field3}
                on:Change={(e) => handleChange(item.id, 'field3', e.target.value)}
              />
            </div>
            <div class="govuk-form-group">
              <label for={`input-${item.id}-field4`} class="govuk-label">Field 4</label>
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
      <Show when={items().length < 4}>
        <button type="button" class="govuk-button" onClick={addItem}>Add Another</button>
      </Show>
    </div>
  );
}

export default AddAnother;