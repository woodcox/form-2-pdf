import { createStore } from 'solid-js/store';

const formDefaultValues = {
  YourFirstName: '',
  YourSurname: '',
  PartnerFirstName: '',
  PartnerSurname: '',
  Email: '',
  Phone: '',
  Date: '',
  //get Date() {
  //  return `${this.Day}` +"/"+ `${this.Month}` +"/"+ `${this.Year}`;
  //},
  Mother: '',
};

export const [inputState, setInputState] = createStore(formDefaultValues);
