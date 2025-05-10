const { createApp, ref } = Vue;

const app = createApp({
  setup() {
    const mountPointId = "vue-app-hello";
    const msg = ref("Hello World");
    return {
      mountPointId,
      msg,
    };
  },
  template: `
    <h1>{{ msg || 'Welcome' }}</h1>
    <input class="form-input" v-model="msg" type="text">
  `,
});

app.mount("#vue-app-hello");
