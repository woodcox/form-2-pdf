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
  Month: '',
  Year: '',
  Mother: '',
};

export const [formState, setFormState] = createStore(formDefaultValues);