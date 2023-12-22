import { createSignal } from 'solid-js';
const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : '';

export default function Form(props) {
  // Add urlPrefix to navigation links
  const prevPagePrefix = `${urlPrefix}${props.prevPage}`;
  const nextPagePrefix = `${urlPrefix}${props.nextPage}`;

  // create local signals
  const [localInputs, setLocalInputs] = createSignal(props.inputs);

  const handleChange = (property, value) => {
    setLocalInputs({ ...localInputs(), [property]: value });
    props.onInputsChange({ ...props.inputs, [property]: value });
  };

  const handleMultiInputChange = (property, subfield, value) => {
    const updatedInputs = { ...localInputs() };

    if (!updatedInputs[property]) {
      updatedInputs[property] = {};
    }

    updatedInputs[property][subfield] = value;
    setLocalInputs(updatedInputs);

    const updatedProps = {
      ...props.inputs,
      [property]: {
        ...(props.inputs[property] || {}),
        [subfield]: value,
      },
    };

    props.onInputsChange(updatedProps);
  };

  return (
    <form>
      {Object.entries(props.template.schemas[0]).map(([property, config]) => {
        if (config.pageUrl !== props.currentPage) return null;

        if (config.multiInput) {
          return Object.entries(config.multiInput).map(
            ([subfield, subconfig]) => (
              <div>
                <label for={property.subfield}>
                  {subconfig.label}
                  {!subconfig.required && <span> (optional)</span>}:
                  <input
                    name={property.subfield}
                    id={property.subfield}
                    type={subconfig.fieldType}
                    title={subconfig.errormessage}
                    required={subconfig.required}
                    placeholder={subconfig.placeholder}
                    pattern={subconfig.pattern}
                    autocomplete={subconfig.autocomplete}
                    autofocus={subconfig.autofocus}
                    value={JSON.stringify(
                      localInputs()[property]?.[subfield] || ''
                    )}
                    onChange={(e) =>
                      handleMultiInputChange(property, subfield, e.target.value)
                    }
                  />
                </label>
              </div>
            )
          );
        } else {
          return (
            <div>
              <label for={property}>
                {config.label}
                {!config.required && <span> (optional)</span>}:
                <input
                  name={property}
                  id={property}
                  type={config.fieldType}
                  title={config.errormessage}
                  required={config.required}
                  placeholder={config.placeholder}
                  pattern={config.pattern}
                  autocomplete={config.autocomplete}
                  autofocus={config.autofocus}
                  value={localInputs()[property]}
                  onChange={(e) => handleChange(property, e.target.value)}
                />
              </label>
            </div>
          );
        }
      })}
      <nav>
        <Show when={props.currentPage != '/'}>
          {
            <a href={prevPagePrefix}>
              <i>Back</i>
            </a>
          }
        </Show>
        <a href={nextPagePrefix}>
          <b>Next</b>
        </a>
      </nav>
    </form>
  );
}
