import { createSignal } from 'solid-js';
const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : "";

export default function Form(props) {
  const [localInputs, setLocalInputs] = createSignal(props.inputs);

  const handleChange = (property, value) => {
    setLocalInputs({ ...localInputs(), [property]: value });
    props.onInputsChange({ ...props.inputs, [property]: value });
  };

  // Add urlPrefix to navigation links
  const prefixedPrevPage = `${urlPrefix}${props.prevPage}`;
  const prefixedNextPage = `${urlPrefix}${props.nextPage}`;


  return (
    <form>
      {Object.entries(props.template.schemas[0]).map(([property, config]) => {
        if (config.pageUrl !== props.currentPage) return null;

        return (
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
        );
      })}
      <nav>
        <a href={prefixedPrevPage}>
          <i>Back</i>
        </a>
        <a href={prefixedNextPage}>
          <b>Next</b>
        </a>
      </nav>
    </form>
  );
}
