const InputEdit = (props) => {
  
    return (
        <div class="inputEdit">
            <label for={props.name}>{props.label}</label>
            <input
                name={props.name}
                id={props.name}
                value={props.value}
                type="text"
            />
            <button>{props.button}</button>
        </div>
    );
};

export default InputEdit;