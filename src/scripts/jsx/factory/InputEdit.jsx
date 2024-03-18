const InputEdit = (props) => {
  
    return (
        <>
            <label for={props.name}>{props.label}</label>
            <div class="group">
            <input
                name={props.name}
                id={props.name}
                value={props.value}
                type="text"
            />
            <button type="submit" class="govuk-button govuk-button--secondary" data-module="govuk-button">{props.button}</button>
            </div>
        </>
    );
};

export default InputEdit;