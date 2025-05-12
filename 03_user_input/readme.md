# User Inputs

## Handle User Inputs with `v-model`

We will continue to learn about the reactivity system in this lesson. You'll learn how to handle user inputs with the `v-model` directive. `v-model` gives super powers to text inputs, checkboxes, radio buttons, selects, and more!

<div class="vue-interactive-solution" data-solution-id="list" data-vue-app-script="app.js">
    <h3>A Simple Item List</h3>
    <div class="solution-container" id="vue-app-list"></div>
</div>

## Modifiers

Modifiers can alter the behavior of a `v-model` directive. For example, using `.lazy`modifier to make an input less real-time:

```html
<input v-model.lazy="newItem" type="text" />
```

Other handy modifiers:

- `.number`: Casts your data to a number.
- `.trim`: Automatically remove any surrounding whitespaces from the input string.

> We can user `v-model`for text areas, selects, checkboxes, radio buttons, and more.

## Using Checkboxes to Add/Remove Items of an Array

For example, let's do an icecream flavors chooser. First, create a new array variable:

```javascript
const { ref } = Vue;

const iceCreamFlavors = ref([]);
```

Then using `v-model` in the checkbox inputs:

```html
<input type="checkbox" value="vanila" v-model="iceCreamFlavors" />
<input type="checkbox" value="chocolate" v-model="iceCreamFlavors" />
<input type="checkbox" value="strawberry" v-model="iceCreamFlavors" />
<input type="checkbox" value="mint" v-model="iceCreamFlavors" />
<input type="checkbox" value="pistachio" v-model="iceCreamFlavors" />
```
