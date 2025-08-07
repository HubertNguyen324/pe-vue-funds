const { createApp, ref } = Vue;

const mountPointId = "vue-app-hello";

const app = {
  template: `
    <h3>{{ msg || 'Welcome' }}</h3>
    <label class="default-label">Enter a Text</label>
    <input v-model="msg" type="text" class="default-textbox">
    <button @click="sayHello" class="default-btn mt-2">Action</button>
  `,

  setup() {
    const msg = ref("Hello World");

    const sayHello = () => alert(msg.value);

    return {
      msg,
      sayHello,
    };
  },

  created() {
    console.log("The message is: " + this.msg);
  },
};

createApp(app).mount(`#${mountPointId}`);
