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
        component: 'AppendFields',
        componentProps: {
          componentId: 'YourFullName', // this must be unique if you don't want multiple AppendFields components sharing the same state
          fields: [
            { name: 'yourFirstname', label: 'Your first name' },
            { name: 'yourMiddlename', label: 'Your middle names' },
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
        component: 'AppendFields',
        componentProps: {
          componentId: 'PartnerFullName',
          fields: [
            { name: 'partnerFirstname', label: 'Their first name' },
            { name: 'partnerMiddlename', label: 'Their middle names' },
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
          componentId: 'ceremonyType',
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
        component: 'Dropdown',
        componentProps: {
          name: 'venue',
          label: 'Where is your ceremony taking place?',
          value: '',
          options: [
            { label: 'Select your venue', value: '' , placeholder: true },
            { label: 'Civic Hall', value: 'Civic Hall' },
            { label: 'Leeds Town Hall', value: 'Leeds Town Hall' }
          ]
        }
      },
      CeremonyDate: {
        pageUrl: '/booking',
        label: 'Ceremony date',
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
        component: 'Radio',
        componentProps: {
          componentId: 'WordingOption',
          name: 'WordingOption',
          label: 'Which ceremony wording?',
          value: '',
          initialOption: 'Choose your ceremony wording',
          options: [
            { name: 'wordingOption', value: 'Option 1', id: 'Option1' },
            { name: 'wordingOption', value: 'Option 2', id: 'Option2' },
            { name: 'wordingOption', value: 'Option 3', id: 'Option3' }
          ]
        }
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
        component: 'Textarea',
        componentProps: {
          componentId: 'RoomEntrance',
          name: 'RoomEntrance',
          label: 'How are you planning to enter the ceremony room?',
          value: '',
          rows: 5,
        }
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
        component: 'AppendFields',
        componentProps: {
          componentId: 'Witness1',
          fields: [
            { name: 'witnessFirstname', label: 'Witness 1 first name' },
            { name: 'witnessMiddlename', label: 'Witness 1 middle names' },
            { name: 'witnessLastname', label: 'Witness 1 surname' }
          ]
        }
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
        component: 'AppendFields',
        componentProps: {
          componentId: 'Witness2',
          fields: [
            { name: 'witness2Firstname', label: 'Witness 2 first name' },
            { name: 'witness2Middlename', label: 'Witness 2 middle names' },
            { name: 'witness2Lastname', label: 'Witness 2 surname' }
          ]
        }
      },
      YourParents: {
        pageUrl: '/your-parents',
        label: 'Your parent(s)',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherParent',
        componentProps: {
          componentId: 'YourParents',
          title: 'parent',
          grammar: 'Your',
          visible: true,
          hintText: "For example, your mother, father or parent"
        }
      },
      YourStepParents: {
        pageUrl: '/your-parents',
        label: 'Your step-parent(s)',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherParent',
        componentProps: {
          componentId: 'YourStepPartents',
          title: 'step-parent',
          grammar: 'Your',
          hintText: "For example, your step-mother, step-father or step-parent"
        }
      },
      PartnerParents: {
        pageUrl: '/partner-parents',
        label: 'Your Partners Parent(s)',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherParent',
        componentProps: {
          componentId: 'PartnerParents',
          title: 'parent',
          grammar: "Partner's",
          visible: true,
          hintText: "For example, their mother, father or parent"
        }
      },
      PartnerStepParents: {
        pageUrl: '/partner-parents',
        label: "Your partner's step-parent(s)",
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherParent',
        componentProps: {
          componentId: 'PartnerStepParents',
          title: 'step-parent',
          grammar: "Partner's",
          hintText: "For example, their step-mother, step-father or step-parent"
        }
      },
      BeforeCeremonyMusic: {
        pageUrl: '/music',
        label: "Before the ceremony",
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherMusic',
        componentProps: {
          componentId: 'BeforeCeremonyMusic',
          title: 'song',
          musicSection: "Before the ceremony",
          songNumber: 3,
          hintText: "For example, Ella Fitzgerald At last"
        }
      },
      EntranceMusic: {
        pageUrl: '/music',
        label: "Entrance song",
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherMusic',
        componentProps: {
          componentId: 'EntranceMusic',
          title: 'song',
          songNumber: 1,
          musicSection: "Entrance music",
          hintText: "For example, Ella Fitzgerald At last"
        }
      },
      SigningMusic: {
        pageUrl: '/music',
        label: "Signing the schedule and taking photos",
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherMusic',
        componentProps: {
          componentId: 'SigningMusic',
          title: 'song',
          songNumber: 3,
          musicSection: "Signing the schedule and taking photos",
          hintText: "For example, Ella Fitzgerald At last"
        }
      },
      ExitMusic: {
        pageUrl: '/music',
        label: "Exit song",
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'AddAnotherMusic',
        componentProps: {
          componentId: 'ExitMusic',
          title: 'song',
          songNumber: 1,
          musicSection: "Exit music",
          hintText: "For example, Ella Fitzgerald At last"
        }
      },
    },
  ],
};

export const [template, setTemplate] = createSignal(schema);