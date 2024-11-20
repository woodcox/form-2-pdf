export default function LegendHeader({ pageNumber, heading, headline }) {
  return (
    <>
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
        <Show when={pageNumber}>
          <span class="govuk-caption-l">Question {pageNumber} of 7</span>
        </Show>
        <h1 class="govuk-fieldset__heading">{heading}</h1>
      </legend>
      <Show when={headline}>
        <p class="govuk-body">{headline}</p>
      </Show>
    </>
  );
}
