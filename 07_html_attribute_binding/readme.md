# HTML Attribute Binding in Vue

We know how to render data in the DOM with Vue 3, and now it's time to take a closer look at how we can bind HTML attributes to our Vue data.

This is achieved with Vue's `v-bind` directive and would let us change the `href` (or any other HTML attribute) of a link or swap out an image if we need to.

> - For the link to work properly you should provide the protocol in the input (http:// or https://)
> - `v-bind` can be shorted to `:`. For example, from `v-bind:disabled` to `:disabled`.

<h2>Simple To-Do List App</h2>
<div class="vue-interactive-solution" data-solution-id="todo-list" data-vue-app-script="app.js">
    <div class="solution-container"></div>
</div>
