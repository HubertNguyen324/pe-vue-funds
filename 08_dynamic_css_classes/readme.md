# Dynamic CSS Classes with Vue

A common need and use case for attribute bindings is to manipulate the look of elements with CSS classes or style attributes.

To make this task easier than ever, Vue provides special enhancements when `v-bind` is used with the class or style attribute. In this lesson, we learn how to apply dynamic classes based on our Vue data.

> - You can add CSS static classes with `v-bind:class`.
> - For example, `<a class="static-class" :class="{condition: dynamicClass}">`
> - Using `-` in the name of dynamic CSS classes can result in error.

<h2>Simple To-Do List App</h2>
<div class="vue-interactive-solution" data-solution-id="todo-list" data-vue-app-script="app.js">
    <div class="solution-container"></div>
</div>

## Array Syntax

```html
<!-- An example for array syntax -->
<a :class="['static-1', 'static-2']"> </a>
<a
  :class="[
    {condition1: dynamicClass1},
    {condition2: dynamicClass2}
]"
>
</a>
```
