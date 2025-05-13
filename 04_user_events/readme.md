# User Events

In this lesson, we'll learn how to respond to and handle user events with Vue's `v-on` directive.

Vue harnesses the power of JavaScript events in a short, declarative syntax. This makes it easy to react to clicks, scrollingm mouse movement, .etc.

<div class="vue-interactive-solution" data-solution-id="list" data-vue-app-script="app.js">
    <h3>A Simple Item List App</h3>
    <div class="solution-container"></div>
</div>

## Using `v-on` Directive

- `v-on:click=`or `@click=`
- `v-on:keyup.enter=`or `@keyup.enter=` (Or any key that JavaScript supports)
- `v-on:scroll=`or `@scroll=`
- `v-on` can also handle right click, focus, and mouseover, and more.

## Simplify Input Form Iteraction

- Using `<form>`
- Add `v-on:submit.prevent=` or `@submit.prevent=`
