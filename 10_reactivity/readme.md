# Reactivity Fundamentals

What's Vue without it's powerful reactivity system? In this lesson, we dive into reactive data in Vue and explore the different options for declaring reactive data with the `ref()` and `reactive()` functions.

`reactive` only works with non-primitive data types, like objects and arrays.

## A Simple Counter

<div class="vue-interactive-solution" data-solution-id="counter" data-vue-app-script="counter.js">
    <div class="solution-container"></div>
</div>

- One big different between `ref` and `reactive`: We don't need to use `.value` property with `reactive`.
- A downside of `reactive` is that it's not easily replaced. That's why `ref` exsits.

```javascript
// try to replace reatctive variable state in a method
let state = reactive({ count: 0 }); // use let so that we can overwrite the value

const increment = () => {
  state = { count: state.count + 1 }; // this wouldn't work with reactive
};
```

> In fact, Vue does automatic unwarpping of all the refs in the template section. Therefore, we don't have to use `.value` inside of the template.

## Continue with the To-Do List App

1. Use `reactive` for `newItem` and a new `state` variable for app state management.
2. Add item selection feature
3.

<div class="vue-interactive-solution" data-solution-id="todo-list" data-vue-app-script="app.js">
    <div class="solution-container"></div>
</div>
