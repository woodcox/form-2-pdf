import { createSignal } from 'solid-js';
// Factory file
import MountGovUk from './MountGovUk.jsx';
import AddAnotherParent from './AddAnotherParent.jsx';


// Form Component file
import Questions from './../formComponents/Questions.jsx';
import ErrorBoundaryWrapper from './../formComponents/ErrorBoundaryWrapper.jsx';
import LegendHeader from './../formComponents/LegendHeader.jsx';
import NavigationButtons from './../formComponents/NavigationButtons.jsx';
import SummaryPage from './../formComponents/SummaryPage.jsx';
import { pdfState, setPdfState } from './../pdfme/pdfDefaultValues.jsx';

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
        setPdfState={props.setPdfState}
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
          <AddAnotherParent
            title="parent"
            grammar="Your"
            visible={true}
            hintText="For example, your mother, father or parent"
          />
          <AddAnotherParent
            title="step-parent"
            grammar="Your"
            hintText="For example, your step-mother, step-father or step-parent"
          />      
    </form>
    </ErrorBoundaryWrapper>
    </>
  );
}