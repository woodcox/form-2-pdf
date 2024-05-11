import { onMount } from 'solid-js';
import { Radios } from 'govuk-frontend/dist/govuk/components/radios/radios.mjs';
import { Button } from 'govuk-frontend/dist/govuk/components/button/button.mjs';
//import { Accordion } from 'govuk-frontend/dist/govuk/components/accordion/accordion.mjs';

const MountGovUk = () => {
  onMount(() => {
    // Initialize the Govuk components when the component mounts

    // ACCORDIONS FOR TESTING PURPOSES
    /*
    const accordionElements = document.querySelectorAll('[data-module="govuk-accordion"]');
    Array.from(accordionElements).forEach((element) => new Accordion(element));
    */

    // RADIOS
    const radioElements = document.querySelectorAll('[data-module="govuk-radios"]');
    Array.from(radioElements).forEach((element) => new Radios(element));

    // BUTTONS
    const buttonElements = document.querySelectorAll('[data-module="govuk-button"]');
    Array.from(buttonElements).forEach((element) => new Button(element));
  });
};

export default MountGovUk;