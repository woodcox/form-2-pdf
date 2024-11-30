import { For } from 'solid-js';

/*
Example:
  <Accordion
    name="ceremonyWords"
    sections={[
      { label: 'Option 1 words', content: 'blah blah blah', id: 'Option1' },
      { label: 'Option 2 words', content: 'blah blah blah', id: 'Option2' },
      { label: 'Option 3 words', content: 'blah blah blah', id: 'Option3' },
    ]}
  />
*/

const Accordion = (props) => {
  return (
    <div
      class="govuk-accordion"
      data-module="govuk-accordion"
      id={`accordion-${props.name}`}
    >
      <For each={props.sections}>
        {(section, index) => (
          <div class="govuk-accordion__section">
            <div class="govuk-accordion__section-header">
              <h2 class="govuk-accordion__section-heading">
                <span
                  class="govuk-accordion__section-button"
                  id={`accordion-${section.id}-heading-${index()}`}
                >
                  {section.label}
                </span>
              </h2>
            </div>
            <div
              id={`accordion-${section.id}-content-${index()}`}
              class="govuk-accordion__section-content"
            >
              <p class="govuk-body">{section.content}</p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default Accordion;
