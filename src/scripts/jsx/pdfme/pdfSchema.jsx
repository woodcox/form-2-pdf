import { createSignal } from 'solid-js';
import { CEREMONY_PDF } from './basePdf.js';

const schema = {
  basePdf: CEREMONY_PDF,
  schemas: [
    {
      YourFullName: {
        pageUrl: '/your-details',
        label: 'Your fullname',
        type: 'text',
        position: { x: 68.28, y: 60.66 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter your fullname',
        required: true,
        autofocus: true,
        component: 'AppendFields',
        componentProps: {
          componentId: 'YourFullName', // this must be unique if you don't want multiple AppendFields components sharing the same state
          fields: [
            { name: 'yourFirstname', label: 'Your first name' },
            { name: 'yourMiddlename', label: 'Your middle names (optional)' },
            { name: 'yourLastname', label: 'Your surname' }
          ]
        }
      },
      PartnerFullName: {
        pageUrl: '/partner',
        label: 'Your partners fullname',
        type: 'text',
        position: { x: 68.28, y: 60.66 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter your partners fullname',
        required: true,
        autofocus: true,
        component: 'AppendFields',
        componentProps: {
          componentId: 'PartnerFullName',
          fields: [
            { name: 'partnerFirstname', label: 'Their first name' },
            { name: 'partnerMiddlename', label: 'Their middle names (optional)' },
            { name: 'partnerLastname', label: 'Their surname' }
          ]
        }
      },
      Email: {
        pageUrl: '/your-details',
        label: 'Your email',
        type: 'text',
        position: { x: 52.4, y: 69.55 },
        width: 140,
        height: 10,
        fieldType: 'email',
        errormessage: 'Enter your email address',
        autocomplete: 'email',
        required: true,
        autofocus: true,
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
        autofocus: true,
      },
      CeremonyType: {
        pageUrl: '/booking',  
        label: 'Ceremony type',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: '',
        required: true,
        component: 'Radio',
        componentProps: {
          name: 'ceremonyType',
          label: 'What type of ceremony have you booked?',
          value: '',
          initialOption: 'Select the ceremony type',
          options: [
            { name: 'ceremonyType', value: 'Marriage', id: 'Marriage' },
            { name: 'ceremonyType', value: 'Civil Partnership', id: 'CivilPartnership' }
          ]
        }
      },
      BookingRef: {
        pageUrl: '/booking',
        label: 'Ceremony booking reference',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      CeremonyVenue: {
        pageUrl: '/booking',
        label: 'Venue',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      CeremonyDateTime: {
        label: 'Ceremony date',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      DateTime: {
        pageUrl: '/booking',
        label: 'Date',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'DateInput',
        componentProps: {
          name: 'date-input',
          heading: 'What date is the wedding?',
          helpText: 'For example, 27 3 2024',
        }
      },
      WordingOption: {
        pageUrl: '/ceremony',
        label: 'Wording option',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      Rings: {
        pageUrl: '/ceremony',
        label: 'Exchange rings',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      RoomEntrance: {
        pageUrl: '/ceremony',
        label: 'Entrance to room',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      Photographer: {
        pageUrl: '/ceremony',
        label: 'Photographer',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      Videographer: {
        pageUrl: '/ceremony',
        label: 'Videographer',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      GuestNumber: {
        pageUrl: '/ceremony',
        label: 'Number of guests',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      Witness1: {
        pageUrl: '/witness',
        label: 'Witness 1 fullname',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      Witness2: {
        pageUrl: '/witness',
        label: 'Witness 2 fullname',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      YourParent1: {
        pageUrl: '/your-parents',
        label: 'Your parents fullname',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      YourParent1Job: {
        pageUrl: '/your-parents',
        label: 'Your parents current or last job',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      YourParent2: {
        pageUrl: '/your-parents',
        label: 'Your parents fullname',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      YourParent2Job: {
        pageUrl: '/your-parents',
        label: 'Your parents current or last job',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      PartnerParent1: {
        pageUrl: '/partner-parents',
        label: 'Your partners parent fullname',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      PartnerParent1Job: {
        pageUrl: '/partner-parents',
        label: 'Your partners parents current or last job',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      PartnerParent2: {
        pageUrl: '/partner-parents',
        label: 'Your partners parent fullname',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
      PartnerParent2Job: {
        pageUrl: '/partner-parents',
        label: 'Your partners parents current or last job',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
      },
    },
    // PAGE 2
    // need new array for a new page
    {
      Mother: {
        type: 'text',
        position: {
          x: 101.34,
          y: 30.69,
        },
        width: 45,
        height: 10,
        rotate: 0,
        alignment: 'left',
        verticalAlignment: 'top',
      },
    },
  ],
};

export const [template, setTemplate] = createSignal(schema);
