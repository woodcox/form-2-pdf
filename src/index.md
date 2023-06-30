---
layout: default.html
title: 11ty-solid-base
---

## Menu
- [WebC]({{ '/webc/' }})

<menu></menu>

## The counter
To test if the island partial hydration is working; on a mobile phone, turn the phone to landscape view. This should swap the html for javascript to start the counter.

<is-land on:media="(min-width: 30em)">
  <counter-component>
    <p>Count value is 0</p>
  </counter-component>
  <template data-island="replace">
    <p id="app"></p>
    <script type="module" src="{{ '/app/app.js' | hash }}"></script>
  </template>
</is-land>


## The shortcode
The shortcode adds the js inline. Need to add import maps for this.

<is-land on:media="(min-width: 30em)">
  <shortcode-component>
    <p>The solidify shortcode is inactive :)</p>
  </shortcode-component>
  <template data-island="replace">
    <p id="shorty"></p>

{% solid "shorty" "zbundleOff" %}
import { render } from 'https://esm.sh/solid-js/web';

function Solidify() {
  return <div>The solidify shortcode is active!</div>;
}

render(() => <Solidify />, document.getElementById('shorty'))
{% endsolid %}
    
  </template>
</is-land> 

## The webC component

<tester></tester>


## SolidJS
A more interesting example

<p id="wordapp"></p>
<script type="module" src="{{ '/app/fetch.js' | hash }}"></script>

<div id="pdf"></div>
<script type="module" src="{{ '/app/render.js' | hash }}"></script>


To do: 
 - A more complex webC example making use of:
 - bundling of webC with Solid-js
 - webC with scoped css
 - Solid-js web components/progressive enhancement example

Look at [11ty docs](https://www.11ty.dev/docs/languages/webc/) & [11ty.rocks](https://11ty.rocks/).
