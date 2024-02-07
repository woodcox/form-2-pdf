const Dropdown = (props) => {
  return (
    <>
      <label for={props.name}>{props.label}</label>
      <select name={props.name} id={props.name}>
        <For each={props.options}>
          {(option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )}
        </For>
      </select>
    </>
  );
};

export default Dropdown;