# Vue Template Syntax and Expressions

In this lesson, we'll dive into Vue's templating syntax and learn how to run JavaScript expressions directly in the template.

<div class="vue-interactive-solution" data-solution-id="hello" data-vue-app-script="hello.js">
    <h3>A Simple Hello World</h3>
    <div class="solution-container" id="vue-app-hello">
        <noscript>
            <div class="solution-content noscript-solution p-3 bg-gray-50 border rounded-md">
                <p>This interactive counter requires JavaScript to function.</p>
            </div>
        </noscript>
    </div>
</div>

## Mustache Syntax `{{ }}`

Inside of a double mustache, we can use the full power of JavaScript expressions. For example, add a `.toLocaleUpperCase`:

```html
<h1>{{ msg.toLocaleUpperCase() }}</h1>
```

There are some limitations:

- We can only evaluate one expression at a time. For example, this will not work `{{ msg.toLocaleUpperCase(); msg ="" }}`.
- We can not declare variables or evaluate if statements. But we can use a shorthanded if statement `{{ msg ? msg : "Hello World" }}` or `{{ msg || "Hello World" }}`.
