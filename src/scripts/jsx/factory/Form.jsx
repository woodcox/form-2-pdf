import { createSignal } from 'solid-js';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

// Factory file
import MountGovUk from './MountGovUk.jsx';

// Form Component file
import Questions from './../formComponents/Questions.jsx';
import ErrorBoundaryWrapper from './../formComponents/ErrorBoundaryWrapper.jsx';
import LegendHeader from './../formComponents/LegendHeader.jsx';
import NavigationButtons from './../formComponents/NavigationButtons.jsx';
import SummaryPage from './../formComponents/SummaryPage.jsx';

// URL from 11ty
const pathPrefix = process.env.PATHPREFIX;
const urlPrefix = pathPrefix ? `/${pathPrefix}` : '';

export default function Form(props) {
  // Add urlPrefix to navigation links
  const prevPagePrefix = `${urlPrefix}${props.prevPage}`;
  const nextPagePrefix = `${urlPrefix}${props.nextPage}`;

  // create local signals
  const [localInputs, setLocalInputs] = createSignal(props.inputs);

  const handleChange = (property, value) => {
    setLocalInputs({ ...localInputs(), [property]: value });
    props.onInputsChange({ ...props.inputs, [property]: value });
  };

  // Initialize the Govuk components when the component mounts
  <MountGovUk />
  
  return (
    <>
    <ErrorBoundaryWrapper>
    <form>
      <fieldset class="govuk-fieldset">
      <LegendHeader 
        pageNumber={props.pageNumber}
        heading={props.heading}
        headline={props.headline}
      />
      <Questions
        template={props.template}
        currentPage={props.currentPage}
        localInputs={localInputs}
        handleChange={handleChange}
        setPdfState={setPdfState}
      />
        {props.currentPage === '/summary' && (
          <SummaryPage
            template={props.template}
            localInputs={localInputs}
            urlPrefix={urlPrefix}
          />
        )}
      </fieldset>
      <NavigationButtons
            currentPage={props.currentPage}
            prevPagePrefix={prevPagePrefix}
            nextPagePrefix={nextPagePrefix}
      />     
    </form>
    </ErrorBoundaryWrapper>
    </>
  );
}