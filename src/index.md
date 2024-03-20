---
layout: default.html
title: Form to pdf
---

<is-land on:visable>
  <form-component>
    <form>
      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 class="govuk-fieldset__heading">Ceremony options</h1>
        </legend>
        <p class="govuk-body">
          Choose your ceremony options for your marriage or civil partnership. This form will create a pdf which you can save. Then you will need to email the pdf to Leeds Register Office.
        </p>
      </fieldset>
      <nav class="govuk-button-group">
        <button disabled aria-disabled="true" class="govuk-button govuk-button--start" data-module="govuk-button">
          Loading
          <span class="spin-loader govuk-button__start-icon"></span>
        </button>
      </nav>
    </form>
  </form-component>
  <template data-island="replace">
    <div id="pdfapp"></div>
    <script type="module" src="{{ '/app/render.js' | hash }}"></script>
  </template>
</is-land>


