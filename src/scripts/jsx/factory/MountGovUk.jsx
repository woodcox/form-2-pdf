import { onMount } from 'solid-js';
import { Radios } from 'govuk-frontend/dist/govuk/components/radios/radios.mjs';
import { Button } from 'govuk-frontend/dist/govuk/components/button/button.mjs';
//import { Accordion } from 'govuk-frontend/dist/govuk/components/accordion/accordion.mjs';
import { ErrorSummary } from 'govuk-frontend/dist/govuk/components/error-summary/error-summary.mjs';

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
    Array.from(buttonElements).forEach((element) => new Button(element, {
        // See - https://frontend.design-system.service.gov.uk/configure-components/#with-configuration-object
        // And - https://frontend.design-system.service.gov.uk/javascript-api-reference/#button
        // Prevent accidental double clicks on submit buttons from submitting forms multiple times.
        preventDoubleClick: true
      }
    ));

    // ERROR SUMMARY 
    // API ref: https://frontend.design-system.service.gov.uk/javascript-api-reference/#errorsummary
    const errorSummaryElements = document.querySelectorAll('[data-module="govuk-error-summary"]');
    Array.from(errorSummaryElements).forEach((element) => new ErrorSummary(element));
  });
};

export default MountGovUk;