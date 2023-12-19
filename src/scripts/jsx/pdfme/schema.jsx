import { createSignal } from 'solid-js';
import { CEREMONY_PDF } from './basePdf.js';

const schema = { 
  basePdf: CEREMONY_PDF,
  schemas: [
    {
      YourFirstName: {
        pageUrl: '/your-details',
        label: 'Your first name',
        type: 'text',
        position: { x: 68.28, y: 60.66 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter your first name',
        required: true,
        autofocus: true,
      },
      YourSurname: {
        pageUrl: '/your-details',
        label: 'Your surname',
        type: 'text',
        position: { x: 68.28, y: 60.66 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter your surname',
        required: true,
        autofocus: true,
      },
      PartnerFirstName: {
        pageUrl: '/partner',
        label: 'Your partners first name',
        type: 'text',
        position: { x: 68.28, y: 60.66 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter your partners first name',
        required: true,
        autofocus: true,
      },
      PartnerSurname: {
        pageUrl: '/partner',
        label: 'Your partners surname',
        type: 'text',
        position: { x: 68.28, y: 60.66 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter your name',
        required: true,
        autofocus: true,
      },
      Email: {
        pageUrl: '/your-details',
        label: 'Your email',
        type: 'text',
        position: { x: 52.4, y: 69.55 },
        width: 140,
        height: 10,
        fieldType: 'text',
        errormessage: 'Enter your full address',
        required: false,
      },
      Phone: {
        pageUrl: '/your-details',
        label: 'Your telephone number',
        type: 'text',
        position: { x: 53.76, y: 80.54 },
        width: 100,
        height: 10,
        fieldType: 'tel',
        errormessage: 'Enter a UK phone number',
        autocomplete: 'tel',
        required: true,
      },
      /* Date: {
        label: 'Date of event',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'date',
        required: true,
        placeholder: 'dd/mm/yyyy',
      }*/
    },
    // PAGE 2
    // need new array for a new page
    {
      Mother: {
        type: "text",
        position: {
          x: 101.34,
          y: 30.69
        },
        width: 45,
        height: 10,
        rotate: 0,
        alignment: "left",
        verticalAlignment: "top"
      }
    }
  ]
}

export const [template, setTemplate] = createSignal(schema);