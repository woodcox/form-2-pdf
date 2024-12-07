//import DOMPurify from 'dompurify';

/*

The html content is sanitised to prevent XSS attacks. So you can safely use GOV.UK design system HTML components/
Example:

See GOV.UK for heading sizing scales - https://design-system.service.gov.uk/styles/headings/  

<Prose
  content={`<script>alert('XSS Attack!');</script><p>This is safe content.</p>`}
/>

  <Prose
    sections={[
      { size: xl, heading: 'This is a XL heading', content: 'blah blah blah' },
      { size: l, heading: 'This is a large heading', content: 'blah blah blah' },
      { size: m, heading: 'This is a medium heading', content: 'blah blah blah' },
      { size: s, heading: 'This is a small heading', content: 'blah blah blah' },
    ]}
  />
*/
const sanitizedContent = () => 
  DOMPurify.sanitize(props.content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: ['href', 'target'],
  });


const Prose = (props) => {
  const sanitizedContent = () => DOMPurify.sanitize(props.content);

  return (
    <div innerHTML={sanitizedContent()}></div>
  );
};

export default Prose;

/** 
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
*/

export default Prose;
