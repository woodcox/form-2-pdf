import DOMPurify from 'dompurify';
/*

The html content is sanitised to prevent XSS attacks. So you can safely use GOV.UK design system HTML components.

See GOV.UK: 
  - styles - https://design-system.service.gov.uk/styles/
  - components - https://design-system.service.gov.uk/components/

This is intended to be used with GOV.UK components that are just html such as: headings, paragraphs, lists, links, Details, Inset text, Notification banners, Panels, Tables, Tabs, Tags and Warning text.

Example:

<Prose
  content={`<div class="govuk-panel govuk-panel--confirmation">
  <h1 class="govuk-panel__title">
    Application complete
  </h1>
  <div class="govuk-panel__body">
    Your reference number<br><strong>HDJ2123F</strong>
  </div>
</div>`}
/>

*/
const Prose = (props) => {
  const clean = () => DOMPurify.sanitize(props.content, { USE_PROFILES: { html: true } });

  return (
    <div innerHTML={clean()}></div>
  );
};

export default Prose;