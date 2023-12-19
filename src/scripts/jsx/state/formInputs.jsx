import { createSignal } from 'solid-js';

const formDefaultValues = { 
  YourFirstName: '',
  YourSurname: '',
  PartnerFirstName: '',
  PartnerSurname: '',
  Email: '', 
  Phone: '', 
  Date: '', 
  Mother: '' 
}

export const [inputs, setInputs] = createSignal(formDefaultValues);