import DeleteStorageButton from './DeleteStorageButton';

export default function NavigationButtons({ currentPage, prevPagePrefix, nextPagePrefix }) {
  return (
    <nav class="govuk-button-group">
      <Show when={currentPage != '/'}>
        <a
          role="button"
          draggable="false"
          class="govuk-button govuk-button--secondary"
          data-module="govuk-button"
          href={prevPagePrefix}
        >
          Back
        </a>
      </Show>
      <Show
        when={currentPage == '/'}
        fallback={
          <a
            role="button"
            draggable="false"
            class="govuk-button"
            data-module="govuk-button"
            href={nextPagePrefix}
          >
            Next
          </a>
        }
      >
        <a
          role="button"
          draggable="false"
          class="govuk-button govuk-button--start"
          data-module="govuk-button"
          href={nextPagePrefix}
        >
          Start
          <svg
            class="govuk-button__start-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
            aria-hidden="true"
            focusable="false"
          >
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        </a>
        <DeleteStorageButton />
      </Show>
    </nav>
  );
}
