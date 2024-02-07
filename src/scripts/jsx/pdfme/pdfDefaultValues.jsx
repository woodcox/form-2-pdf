import { createStore } from 'solid-js/store';

const pdfDefaultValues = {
  YourFullName: '',
  PartnerFullName: '',
  Email: '',
  Phone: '',
  BookingRef: '',
  CeremonyType: '',
  CeremonyVenue: '',
  CeremonyDateTime: '',
  WordingOption: '',
  Rings: '',
  RoomEntrance: '',
  Photographer: '',
  Videographer: '',
  GuestNumber: '',
  Witness1: '',
  Witness2: '',
  YourParent1: '',
  YourParent1Job: '',
  YourParent2: '',
  YourParent2Job: '',
  PartnerParent1: '',
  PartnerParent1Job: '',
  PartnerParent2: '',
  PartnerParent2Job: '',
};

export const [pdfState, setPdfState] = createStore(pdfDefaultValues);
