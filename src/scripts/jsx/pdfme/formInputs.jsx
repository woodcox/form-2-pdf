import { createStore } from 'solid-js/store';

const formDefaultValues = {
  YourFirstName: '',
  YourSurname: '',
  PartnerFirstName: '',
  PartnerSurname: '',
  Email: '',
  Phone: '',
  CeremonyDate: '',
  Day: '',
  Mother: '',
};

export const [inputState, setInputState] = createStore(formDefaultValues);
