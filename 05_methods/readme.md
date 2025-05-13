# Methods in Vue with the Composition API

It is handy to run JavaScript expressions directly in the template or a directive sometimes - but not always.

When the expression gets too verbose, or we need the same logic in multiple places, we can extract the logic to a function and fire the function instead. These functions are called methods and allow us to DRY up the code.

> When use Vue's `ref` in a method, you have to use `.value` to access its data. Because Vue uses proxies in order to create reactive data.
> Every time you call a `ref` function, it will return a reactive object, which contains your actual data in the `.value` property.

<div class="vue-interactive-solution" data-solution-id="item-list" data-vue-app-script="app.js">
    <h3>A Simple Item List App</h3>
    <div class="solution-container"></div>
</div>
