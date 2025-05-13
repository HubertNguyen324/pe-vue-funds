# Computed Properties in Vue with the Composition API

Computed properties are another powerful feature from Vue that allows us to transform or perform calculations on our data and then easily reuse the result as an up-to-date variable in our template. Computed properties are very useful and should replace complex in-template expressions.

While this explanation without any code examples might not make much sense right now, it surely will after you've watched this lesson about computed properties.

## Continue To-Do List App

1. Add a character limit enforcement feature and show the users how many characters are left.
2. Add a sort feature where users can reverse the item list.

<div class="vue-interactive-solution" data-solution-id="todo-list" data-vue-app-script="app.js">
    <div class="solution-container"></div>
</div>

> **Note:** The array `reverse()` method alters the array itself. So if you don't want the array to change, use the spread operator to make a copy of it. For example, `[...arrayName].reverse()`
