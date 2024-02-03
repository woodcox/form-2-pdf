import { createStore } from 'solid-js/store';

const pdfDefaultValues = {
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

export const [pdfState, setPdfState] = createStore(pdfDefaultValues);
