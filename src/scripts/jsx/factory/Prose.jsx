import { For } from 'solid-js';


/*
Example:
  <Prose
    sections={[
      { size: 1, heading: 'This is a heading', prose: 'blah blah blah' },
      { size: 2, heading: 'This is a heading', prose: 'blah blah blah' },
      { size: 3, heading: 'This is a heading', prose: 'blah blah blah' },
    ]}
  />
*/

const Prose = (props) => {
  return (
    <>
      <For each={props.sections}>
        {(section) => (
          <>
            <h1 class={`govuk-heading-${section.size}`}>{`${section.heading}`}</h1>
            <p class="govuk-body">{`${section.prose}`}</p>


            <h2 class={`govuk-heading-${section.size}`}>{`${section.heading}`}</h2>
            <p class="govuk-body">{`${section.prose}`}</p>


            <h3 class={`govuk-heading-${section.size}`}>{`${section.heading}`}</h3>
            <p class="govuk-body">{`${section.prose}`}</p>
          </>
        )}
      </For>
    </>
  );
};

export default Prose;
