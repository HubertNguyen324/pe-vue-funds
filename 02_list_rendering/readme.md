# List Rendering in Vue

In almost all applications there is a need to iterate or loop through a list of items and render them on the page.

In this lesson, we're taking a closer look at Vue's `v-for` directive, which lets us iterate through arrays and objects in an elegant matter.

**Links:**

- [Tips and Gotchas for Using key with v-for in Vue.js 3](https://vueschool.io/articles/vuejs-tutorials/tips-and-gotchas-for-using-key-with-v-for-in-vue-js-3/)

<div class="vue-interactive-solution" data-solution-id="list" data-vue-app-script="list.js">
    <h3>A Simple Item List</h3>
    <div class="solution-container"></div>
</div>

## Destructure the `item` Object

```html
<li v-for="({id, name}, index) in items" :key="id">{{name}}</li>
```

> Notes:
>
> - `v-for` will use `index` as the default `:key`
> - `v-for` can also handle objects.
