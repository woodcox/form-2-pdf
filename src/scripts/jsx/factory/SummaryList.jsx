
// PATTERN - https://design-system.service.gov.uk/patterns/check-answers/
const SummaryList = (props) => {
  return (
    <>
      <h2 class="govuk-heading-m">Personal details</h2>
      <dl class="govuk-summary-list govuk-!-margin-bottom-9">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">Name {props.pageUrl}</dt>
          <dd class="govuk-summary-list__value">jen simmons {props.value}</dd>
          <dd class="govuk-summary-list__actions">
            <a class="govuk-link" href={props.pageUrl}>
              Change
              <span class="govuk-visually-hidden"> name {props.pageUrl}</span>
            </a>
          </dd>
        </div>
      </dl>
    </>
  );
};

export default SummaryList;
