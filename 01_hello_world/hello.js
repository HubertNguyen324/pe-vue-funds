const { createApp, ref } = Vue;

const mountPointId = "vue-app-hello"; // for document rendering

const app = createApp({
  setup() {
    const msg = ref("Hello World");
    return {
      msg,
    };
  },
  template: `
    <h1>{{ msg || 'Welcome' }}</h1>
    <input class="form-input" v-model="msg" type="text">
  `,
});

app.mount(`#${mountPointId}`);
