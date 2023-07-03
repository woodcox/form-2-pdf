---
layout: default.html
title: Proof of concept
---

## 11ty, SolidJS & pdfMe
<is-land on:visable>
  <form-component>
    <form>
        <label>
          Name:
          <input type="text"/>
        </label>
        <label>
          Address:
          <input type="text"/>
        </label>
        <label> 
          Phone:
          <input type="text"/>
        </label>
      </form>
      <button type="button" disabled>Generate PDF</button>
  <<form-component>
  <template data-island="replace">
    <div id="pdfapp"></div>
    <script type="module" src="{{ '/app/render.js' | hash }}"></script>
  </template>
</is-land>