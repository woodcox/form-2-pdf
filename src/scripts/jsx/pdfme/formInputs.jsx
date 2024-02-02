import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';

const formDefaultValues = {
  YourFirstName: '',
  YourSurname: '',
  PartnerFirstName: '',
  PartnerSurname: '',
  Email: '',
  Phone: '',
  Date: '',
  Day: '',
  Month: '',
  Year: '',
  //get Date() {
  //  return `${this.Day}` +"/"+ `${this.Month}` +"/"+ `${this.Year}`;
  //},
  Mother: '',
};

export const [inputState, setInputState] = createStore(formDefaultValues);
