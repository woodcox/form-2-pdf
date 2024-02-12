/*import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

function AppendFields(props) {
  // Initialize separate state for each componentId
  const fieldValuesMap = {};

  // Initialize state for each field
  Object.keys(props.fields).forEach((field) => {
    const fieldName = props.fields[field].name;
    const componentId = props.fields[field].componentId;
    if (!fieldValuesMap[componentId]) {
      fieldValuesMap[componentId] = createStore({});
    }
    if (!fieldValuesMap[componentId][fieldName]) {
      // Initialize field value in the store for each componentId
      fieldValuesMap[componentId][fieldName] = '';
    }
  });

  // Create effect to update result whenever field values change
  Object.keys(fieldValuesMap).forEach((componentId) => {
    createEffect(() => {
      const joinedResult = Object.values(fieldValuesMap[componentId])
        .filter(Boolean) // Remove empty values
        .join(' ');

      /*  The ComponentID must be identical to the key in the pdfSchema, for example:

          YourTestName: {
            pageUrl: '/your-details',
            // other props...
            component: 'AppendFields',
            componentProps: {
              componentId: 'TestName',
              fields: [
                { name: 'testname1', label: 'Testing name1' },
                { name: 'testname2', label: 'Testing name2' },
                // more field props...
              ]
            }
          },
      
      // Assuming you have a function named `onChange` in props
      props.onChange(joinedResult); 
    });
  });

  return (
    <>
      <For each={props.fields}>
        {(field) => (
          <>
            <label for={field.name}>{field.label}:</label>
            <input
              type="text"
              id={field.name}
              value={fieldValuesMap[field.componentId][field.name]}
              onInput={(e) => fieldValuesMap[field.componentId][field.name] = e.target.value}
            />
          </>
        )}
      </For>
    </>
  );
}

export default AppendFields; */

/*import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

const [fieldValues, setFieldValues] = createStore({});

function AppendFields(props) {
  //const [fieldValues, setFieldValues] = createStore({});

  //console.log('appendStore', fieldValues());
  
  // Initialize state for each field
  Object.keys(props.fields).forEach((field) => {
    const fieldName = props.fields[field].name;
    console.log('fieldName:', fieldName);
    if (!fieldValues[fieldName]) {
      // Initialize field value in the store
      setFieldValues(fieldName, '');
    }
  });

  // Create effect to update result whenever field values change
  createEffect(() => {
    const joinedResult = Object.values(fieldValues)
      .map((value) => value) // Extract the values from the store
      .filter(Boolean) // Remove empty values
      .join(' ');

    console.log('result:',joinedResult);

    // Assuming you have a function named `onChange` in props
    props.onChange(joinedResult);
  });

  return (
    <>
      <For each={props.fields}>
        {(field) => (
          <>
            <label for={field.name}>{field.label}:</label>
            <input
              type="text"
              id={field.name}
              value={fieldValues[field.name]}
              onInput={(e) => setFieldValues(field.name, e.target.value)}
            />
          </>
        )}
      </For>
    </>
  );
}

export default AppendFields; */

import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

// Function to generate a unique store name
function generateStoreName() {
  return `fieldValues_${Math.random().toString(36).substring(7)}`;
}

// Initialize a map to store field values stores
const fieldValuesStores = {};
const storeName = storeName || generateStoreName();
  if (!fieldValuesStores[storeName]) {
    fieldValuesStores[storeName] = createStore({});
  }

  // Get the field values store for this component instance
  const [fieldValues, setFieldValues] = fieldValuesStores[storeName];

function AppendFields(props) {
  // Check if the store for this component instance exists, if not, create a new one
  

  // Initialize state for each field
  Object.keys(props.fields).forEach((field) => {
    const fieldName = props.fields[field].name;
    if (!fieldValues[fieldName]) {
      // Initialize field value in the store
      setFieldValues(fieldName, '');
    }
  });

  // Create effect to update result whenever field values change
  createEffect(() => {
    const joinedResult = Object.values(fieldValues)
      .map((value) => value) // Extract the values from the store
      .filter(Boolean) // Remove empty values
      .join(' ');

    // Assuming you have a function named `onChange` in props
    props.onChange(joinedResult);
  });

  return (
    <>
      <For each={props.fields}>
        {(field) => (
          <>
            <label for={field.name}>{field.label}:</label>
            <input
              type="text"
              id={field.name}
              value={fieldValues[field.name]}
              onInput={(e) => setFieldValues(field.name, e.target.value)}
            />
          </>
        )}
      </For>
    </>
  );
}

export default AppendFields;
