<Switch fallback={<div>Not Found</div>}>
  <Match when={state.route === "home"}>
    <div>After Test</div>
  </Match>
  <Match when={state.route === "settings"}>
  <div>After Test 2</div>
  </Match>
</Switch>