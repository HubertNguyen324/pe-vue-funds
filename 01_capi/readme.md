# Vue Composition API Introduction

## What is It?

Composition API (or CAPI for short) is an alternative to the Options API in Vue 2. It's an umbrella term that covers:

- Reactivity API
- Lifecycle Hooks
- Dependency Injection

## Why is It?

There are some problems with the Options API:

1. The segmented logical concerns.
2. Flawed reusable component logic with Mixins.
   - Obscures source of component data
   - Obscures from developers and IDE
   - Leads to naming collisions
3. Limited TypeScript support

## Basic How

### The Setup Method

- Use the `setup()` method as the entry point for the CAPI.
- It is a function which is executed automatically by Vue before the component is created, once the props are resolved.

### Incorporate with the Options API

> The setup function does not execute in isolation. It can takes in a couple of helpful parameters, such as `props` and `context`.
#### `props`
- This is a way to access the props passed to the component.
- `props` is reactive data.

#### `context`
- We can deconstruct the context into `{ attrs, slots, emit }`.
- `context` is not reactive.
- We can use only the data needed from the context.

## Example

<div class="vue-interactive-solution" data-solution-id="capi" data-vue-app-script="app.js">
    <div class="solution-container"></div>
</div>
