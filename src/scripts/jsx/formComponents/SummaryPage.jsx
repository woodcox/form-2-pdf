/* Grouped Fields for summary list
        This function groups fields based on their pageUrl property.
        It iterates through each entry in the props.template.schemas[0] object, where each entry represents a field property and its configuration.
        For each field, it checks if a pageUrl property is defined in its configuration.
        If a pageUrl property is found, it initializes an array in the acc object with the pageUrl as the key if it doesn't already exist.
        It then pushes an object containing the field's property and configuration to the array corresponding to the pageUrl.
        Finally, it returns the acc object, which contains the fields grouped by their pageUrl. */

/* Render grouped fields for summary page 
        PATTERN - https://design-system.service.gov.uk/patterns/check-answers/*/

export default function SummaryPage({ template, localInputs, urlPrefix }) {
  const groupedInputs = Object.entries(template.schemas[0]).reduce(
    (group, [key, input]) => {
      const { pageUrl } = input;
      if (!group.has(pageUrl)) {
        group.set(pageUrl, []);
      }
      const pageGroup = group.get(pageUrl);
      pageGroup.push({ [key]: input });
      return group;
    },
    new Map()
  );
  // console.log(groupedInputs); // You can uncomment this line for debugging

  return (
    <For each={Array.from(groupedInputs.entries())}>
      {(entry) => {
        const [pageUrl, fields] = entry;
        return (
          <>
            {/* TO DO: Update if add more pageUrls */}
            <Switch fallback="A is heading missing from summary page, please contact the developer.">
              <Match when={pageUrl === '/your-details'}>
                <h2 class="govuk-heading-m">About you</h2>
              </Match>
              <Match when={pageUrl === '/partner'}>
                <h2 class="govuk-heading-m">About your partner</h2>
              </Match>
              <Match when={pageUrl === '/booking'}>
                <h2 class="govuk-heading-m">Your booking</h2>
              </Match>
              <Match when={pageUrl === '/ceremony'}>
                <h2 class="govuk-heading-m">Ceremony details</h2>
              </Match>
              <Match when={pageUrl === '/vows'}>
                <h2 class="govuk-heading-m">Vows</h2>
              </Match>
              <Match when={pageUrl === '/witness'}>
                <h2 class="govuk-heading-m">Your witnesses</h2>
              </Match>
              <Match when={pageUrl === '/your-parents'}>
                <h2 class="govuk-heading-m">Your parents</h2>
              </Match>
              <Match when={pageUrl === '/partner-parents'}>
                <h2 class="govuk-heading-m">Your partners parents</h2>
              </Match>
              <Match when={pageUrl === '/music'}>
                <h2 class="govuk-heading-m">Your music</h2>
              </Match>
            </Switch>
            <dl class="govuk-summary-list govuk-!-margin-bottom-9">
              <For each={fields}>
                {(fieldEntry) => {
                  const [schemaKey, schemaObject] =
                    Object.entries(fieldEntry)[0]; // Get the schema key and schema object
                  const { label } = schemaObject;
                  return (
                    <div class="govuk-summary-list__row">
                      <dt class="govuk-summary-list__key">{label}</dt>
                      <dd class="govuk-summary-list__value">
                        {localInputs()[schemaKey]}
                      </dd>
                      <dd class="govuk-summary-list__actions">
                        <a class="govuk-link" href={`${urlPrefix}${pageUrl}`}>
                          Change
                        </a>
                      </dd>
                    </div>
                  );
                }}
              </For>
            </dl>
          </>
        );
      }}
    </For>
  );
}
