import { createStore } from 'solid-js/store';

const pdfDefaultValues = {
  YourFullName: '',
  PartnerFullName: '',
  Email: '',
  Phone: '',
  CeremonyVenue: '',
  CeremonyDate: '',
  CeremonyTime: '',
  Day: '',
  Month: '',
  Year: '',
  Mother: '',
};

export const [pdfState, setPdfState] = createStore(pdfDefaultValues);
