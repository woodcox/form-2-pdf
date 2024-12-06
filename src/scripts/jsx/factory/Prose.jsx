import { For, Switch, Match } from 'solid-js';

/*
Example:

See GOV.UK for heading sizing scales - https://design-system.service.gov.uk/styles/headings/  

  <Prose
    sections={[
      { size: xl, heading: 'This is a XL heading', content: 'blah blah blah' },
      { size: l, heading: 'This is a large heading', content: 'blah blah blah' },
      { size: m, heading: 'This is a medium heading', content: 'blah blah blah' },
      { size: s, heading: 'This is a small heading', content: 'blah blah blah' },
    ]}
  />
*/

const Prose = (props) => {
  return (
    <>
      <For each={props.sections}>
        {(section) => (
          <>
            <Switch>
              <Match when={section.size === 'xl'}>
                <h1 class={`govuk-heading-${section.size}`}>
                  {`${section.heading}`}
                </h1>
                <p class="govuk-body">{`${section.content}`}</p>
              </Match>

              <Match when={section.size === 'l'}>
                <h1 class={`govuk-heading-${section.size}`}>
                  {`${section.heading}`}
                </h1>
                <p class="govuk-body">{`${section.content}`}</p>
              </Match>

              <Match when={section.size === 'm'}>
                <h2 class={`govuk-heading-${section.size}`}>
                  {`${section.heading}`}
                </h2>
                <p class="govuk-body">{`${section.content}`}</p>
              </Match>

              <Match when={section.size === 's'}>
                <h3 class={`govuk-heading-${section.size}`}>
                  {`${section.heading}`}
                </h3>
                <p class="govuk-body">{`${section.content}`}</p>
              </Match>
            </Switch>
          </>
        )}
      </For>
    </>
  );
};

export default Prose;
