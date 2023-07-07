import { createForm } from '@modular-forms/solid';

type ceremonyForm = {
  partner1_name: string;
  partner2_name: string;
  venue: string;
  room: string;
  date: 'Date';
  time: 'Date';
  outside: boolean;
  address1: string;
  address2: string;
  address3: string;
  town_city: string;
  postcode: string;
  phone_number: number;
  email: string;
  wording_option: number;
  rings: boolean;
  entrance: string;
  number_of_bridesmaids_attendants: number;
  ringbearer: string;
  photographer: string;
  videographer: string;
  no_of_guests: number;
  reading1_title: string;
  reading1_reader: string;
  reading1_details: string;
  reading2_title: string;
  reading2_reader: string;
  reading2_details: string;
  witness1: string;
  witness2: string;
  bestman_person: string;
  partner1_parent1_name: string;
  partner1_parent1_job: string;
  partner1_parent2_name: string;
  partner1_parent2_job: string;
  partner1_parent3_name: string;
  partner1_parent3_job: string;
  partner1_parent4_name: string;
  partner1_parent4_job: string;
  partner2_parent1_name: string;
  partner2_parent1_job: string;
  partner2_parent2_name: string;
  partner2_parent2_job: string;
  partner2_parent3_name: string;
  partner2_parent3_job: string;
  partner2_parent4_name: string;
  partner2_parent4_job: string;
  music_before1: string;
  music_before2: string;
  music_before3: string;
  music_before4: string;
  music_entrance: string;
  music_signing1: string;
  music_signing2: string;
  music_signing3: string;
  music_exit: string;
  special_requirements: string;
};

export default function App() {
  const [ceremonyForm, { Form, Field, FieldArray }] = createForm<ceremonyForm>();

  return (
    <Form>
      <Field name="partner1_name">
        {(field, props) => <input {...props} type="partner1_name" />}
      </Field>
      <Field name="partner2_name">
        {(field, props) => <input {...props} type="partner2_name" />}
      </Field>
      <Field name="venue">
        {(field, props) => <input {...props} type="venue" />}
      </Field>
      <Field name="room">
        {(field, props) => <input {...props} type="room" />}
      </Field>
      <Field name="date" type="Date">
        {(field, props) => <input {...props} type="Date" />}
      </Field>
      <Field name="time" type="Time">
        {(field, props) => <input {...props} type="Time" />}
      </Field>
    </Form>
  );
}