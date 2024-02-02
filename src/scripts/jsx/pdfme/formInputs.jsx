import { createStore } from 'solid-js/store';
import formatDate from '../factory/DateInput.jsx';

const formDefaultValues = {
  YourFirstName: '',
  YourSurname: '',
  PartnerFirstName: '',
  PartnerSurname: '',
  Email: '',
  Phone: '',
  Date: formatDate(),
  Day: '',
  Month: '',
  Year: '',
  //get Date() {
  //  return `${this.Day}` +"/"+ `${this.Month}` +"/"+ `${this.Year}`;
  //},
  Mother: '',
};

export const [inputState, setInputState] = createStore(formDefaultValues);
