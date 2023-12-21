import { createStore } from 'solid-js/store';

const formDefaultValues = { 
  YourFirstName: '',
  YourSurname: '',
  PartnerFirstName: '',
  PartnerSurname: '',
  Email: '', 
  Phone: '',
  Day: '',
  Month: '',
  Year: '',
  get Date() {
    return `${this.day}` +"/"+ `${this.month}` +"/"+ `${this.year}`;
  },
  Mother: '' 
}

export const [inputState, setInputState] = createStore(formDefaultValues);