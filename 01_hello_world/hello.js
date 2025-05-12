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
    <h3>{{ msg || 'Welcome' }}</h3>
    <label class="default-label">Enter a Text</label>
    <input v-model="msg" type="text" class="default-textbox">
  `,
});

app.mount(`#${mountPointId}`);
