const SummaryEdit = (props) => {
  return (
    <>
      <dl class="govuk-summary-list">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">Your details {props.pageUrl}</dt>
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

export default SummaryEdit;
