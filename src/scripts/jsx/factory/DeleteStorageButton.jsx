import { addClearMethod } from './makePersisted.jsx';

// Add clear method to localStorage
const localStorageWithClear = addClearMethod(localStorage);

function DeleteStorageButton() {
  const handleClearStorage = () => {
    localStorageWithClear.clear();
    alert('Your ceremony options information has been deleted!');
  };

  return (
    <button type="submit" class="govuk-button govuk-button--warning" data-module="govuk-button" onClick={handleClearStorage}>
      Delete
    </button>
  );
}

export default DeleteStorageButton;