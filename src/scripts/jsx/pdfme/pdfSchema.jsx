import { createSignal } from 'solid-js';
import { CEREMONY_PDF } from './basePdf.js';

const schema = {
  basePdf: CEREMONY_PDF,
  schemas: [
    {
      'Your full name': {
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
      'Partner full name': {
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
      'Ceremony type': {
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
      'Ceremony venue': {
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
            { label: 'Select your venue', value: '' },
            { label: 'Civic Hall', value: 'Civic Hall' },
            { label: 'Leeds Town Hall', value: 'Leeds Town Hall' }
          ]
        }
      },
      'Ceremony room': {
        pageUrl: '/booking',  
        label: 'Room',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: '',
        required: true,
        component: 'Room',
        componentProps: {
          componentId: 'ceremonyRoom',
          name: 'ceremonyType',
          label: 'What room is the ceremony in?',
          value: '',
          initialOption: 'Select the room',
          options: [
            { name: 'ceremonyRoom', value: 'West Room', id: 'WestRoom' },
            { name: 'ceremonyRoom', value: 'Banqueting Suite', id: 'banquetingSuite' }
          ]
        }
      },
      'Ceremony date': {
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
      'Ceremony time': {
        pageUrl: '/booking',
        label: 'Ceremony time',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'Time',
        componentProps: {
          componentId: 'Time',
          name: 'Time',
          label: 'What time is your ceremony?',
          value: '',
          initialOption: 'Select the ceremony type',
          westRoom: [
            { name: 'Time', value: '09:30', id: '9-30' },
            { name: 'Time', value: '10:00', id: '10-00' },
            { name: 'Time', value: '10:30', id: '10-30' },
            { name: 'Time', value: '11:00', id: '11-00' },
            { name: 'Time', value: '11:30', id: '11-30' },
            { name: 'Time', value: '14:00', id: '14-00' },
            { name: 'Time', value: '14:30', id: '14-30' },
            { name: 'Time', value: '15:00', id: '15-00' },
            { name: 'Time', value: '15:30', id: '15-30' },
            { name: 'Time', value: '16:00', id: '16-00' }
          ],
          thuWestRoom: [
            { name: 'Time', value: '14:00', id: '14-00' },
            { name: 'Time', value: '14:30', id: '14-30' },
            { name: 'Time', value: '15:00', id: '15-00' },
            { name: 'Time', value: '15:30', id: '15-30' },
            { name: 'Time', value: '16:00', id: '16-00' }
          ],
          banquetingSuiteOrFriWestRoom: [
            { name: 'Time', value: '09:15', id: '9-15' },
            { name: 'Time', value: '10:00', id: '10-00' },
            { name: 'Time', value: '10:45', id: '10-45' },
            { name: 'Time', value: '11:30', id: '11-30' },
            { name: 'Time', value: '13:15', id: '13-15' },
            { name: 'Time', value: '14:00', id: '14-00' },
            { name: 'Time', value: '14:45', id: '14-45' },
            { name: 'Time', value: '15:30', id: '15-30' }
          ],
          satWestRoom: [
            { name: 'Time', value: '09:30', id: '9-30' },
            { name: 'Time', value: '10:15', id: '10-15' },
            { name: 'Time', value: '11:00', id: '11-00' },
            { name: 'Time', value: '11:45', id: '11-45' },
            { name: 'Time', value: '13:30', id: '13-30' },
            { name: 'Time', value: '14:15', id: '14-15' },
            { name: 'Time', value: '15:00', id: '15-00' },
            { name: 'Time', value: '15:45', id: '15-45' }
          ],
          licencedVenue: [
            { name: 'Time', value: '10:00', id: '10-00' },
            { name: 'Time', value: '11:00', id: '11-00' },
            { name: 'Time', value: '11:30', id: '11-30' },
            { name: 'Time', value: '12:00', id: '12-00' },
            { name: 'Time', value: '13:00', id: '13-00' },
            { name: 'Time', value: '13:30', id: '13-30' },
            { name: 'Time', value: '14:00', id: '14-00' },
            { name: 'Time', value: '15:00', id: '15-00' },
            { name: 'Time', value: '15:30', id: '15-30' },
            { name: 'Time', value: '16:00', id: '16-00' },
            { name: 'Time', value: '17:00', id: '17-00' }
          ]
        }
      },
      'Vows option': {
        pageUrl: '/vows',
        label: 'Vows option',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'CeremonyWords',
        componentProps: {
          componentId: 'WordingOption',
          accordName: 'CeremonyWording',
          marriage: [
            { label: 'Option 1 vows', content: 'I give you this ring as a sign of our marriage and I call upon these persons here present to witness that I [your name] do take thee [partner name] to be my lawful wedded [wife/husband].', id: 'Option1' },
            { label: 'Option 2 vows', content: 'I call upon these persons here present to witness that I [your name] do take thee [partner name] to be my lawful wedded [wife/husband]. I promise to love and care for you and to be faithful to you always. [partner name] I give you this ring as a sign of our marriage, as a lasting reminder of the vows we are making today, and as a symbol of all that we share, now and always.', id: 'Option2' },
            { label: 'Option 3 vows', content: '[partner name] I give you this ring as a sign of our marriage, as a token of my love and affection and as a symbol of our commitment to each other. I call upon these persons here present to witness that I [your name] do take thee [partner name] to be my lawful wedded [wife/husband]. I promise to love and care for you, honour and respect you and share with you all that I have. May we look forward to our future together with hope and happiness and always remember the feelings we share for each other on this our wedding day.', id: 'Option3' },
          ],
          civilPartnership: [
            { label: 'Option 1 words', content: '[partner name] I promise to love and care for you and to be faithful to you always.  I give you this ring as a sign of my love and commitment and as a lasting reminder of the vows we are making today.', id: 'Option1' },
            { label: 'Option 2 words', content: 'I call upon these persons here present, to witness that I [your name], do take thee, [partner name], to be my civil partner. I promise to love and care for you and to be faithful to you always. I give you this ring as a sign of our partnership. Wear it with a feeling of love and pride, now and always.', id: 'Option2' },
            { label: 'Option 3 words', content: 'I call upon these persons here present, to witness that I [your name], do take thee, [partner name], to be my civil partner. I promise to share my life with you, to love and care for you, honour and encourage you. Please accept this ring as a sign of my love for you, as a lasting reminder of the vows we are making today and as a symbol of all that we share, now and always. ', id: 'Option3' },
          ],
          name: 'wordingOption',
          label: 'Which vows do you want to say?',
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
        component: 'Radio',
        componentProps: {
          label: "Will you be exchanging rings?",
          componentId: "exchangeRings",
          options: [
            { name: 'exchangeRings', value: 'Yes, both partners', id: 'bothPartners' },
            { name: 'exchangeRings', value: 'Yes, one partner', id: 'onePartner' },
            { name: 'exchangeRings', value: 'No rings', id: 'noRings' }
          ]
        }
      },
      'Ring bearer': {
        pageUrl: '/ceremony',
        label: 'Ring bearer',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'Textarea',
        componentProps: {
          componentId: 'RingBearer',
          name: 'RingBearer',
          label: 'Who will hold the rings?',
          value: '',
          rows: 2,
        }
      },
      'Room entrance': {
        pageUrl: '/ceremony',
        label: 'Entrance to room',
        type: 'text',
        position: { x: 33.65, y: 104.63 },
        width: 100,
        height: 10,
        fieldType: 'text',
        errormessage: 'Please enter the day',
        required: true,
        component: 'Checkboxes',
        componentProps: {
          label: "How are you planning to enter the ceremony room?",
          componentId: "roomEntrance",
          options: [
            { name: 'roomEntrance', value: 'Together', id: 'together' },
            { name: 'roomEntrance', value: 'With father', id: 'withFather' },
            { name: 'roomEntrance', value: 'With mother', id: 'withMother' },
            { name: 'roomEntrance', value: 'With another relative', id: 'withRelative' },
            { name: 'roomEntrance', value: 'By myself', id: 'bySelf' }
          ]
        }
      },
      'Bridesmaids or attendants': {
        pageUrl: '/ceremony',
        label: 'How many bridesmaids or attendants will enter with you?',
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
        component: 'Radio',
        componentProps: {
          label: "Will you have a photographer?",
          componentId: "photographer",
          options: [
            { name: 'photographer', value: 'Yes', id: 'yesPhoto' },
            { name: 'photographer', value: 'No', id: 'noPhoto' }
          ]
        }
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
        component: 'Radio',
        componentProps: {
          label: "Will you have a videographer?",
          componentId: "videographer",
          options: [
            { name: 'videographer', value: 'Yes', id: 'yesVideo' },
            { name: 'videographer', value: 'No', id: 'noVideo' }
          ]
        }
      },
      'Number of guests': {
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
      'Witness 1': {
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
      'Witness 2': {
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
      'Your parents': {
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
      'Your step-parents': {
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
      'Partner parents': {
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
      'Partner step-parents': {
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
      'Before ceremony music': {
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
      'Entrance music': {
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
        }
      },
      'Signing music': {
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
        }
      },
      'Exit music': {
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
        }
      },
    },
  ],
};

export const [template, setTemplate] = createSignal(schema);