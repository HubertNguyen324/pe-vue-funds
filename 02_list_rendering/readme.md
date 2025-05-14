# List Rendering in Vue

In almost all applications there is a need to iterate or loop through a list of items and render them on the page.

In this lesson, we're taking a closer look at Vue's `v-for` directive, which lets us iterate through arrays and objects in an elegant matter.

**Links:**

- [Tips and Gotchas for Using key with v-for in Vue.js 3](https://vueschool.io/articles/vuejs-tutorials/tips-and-gotchas-for-using-key-with-v-for-in-vue-js-3/)

## Simple Item List

<div class="vue-interactive-solution" data-solution-id="list" data-vue-app-script="list.js">
    <div class="solution-container"></div>
</div>

## Destructure the `item` Object

```html
<li v-for="({id, name}, index) in items" :key="id">{{name}}</li>
```

## Important Notes

> - The rule of thumb is ALWAYS provide the `:key` directive with your `v-for` no matter what and never use the `index` as the key.
> - In fact, Vue will use `index` as the default `:key`.
> - `v-for` can also handle objects.
