const { createApp, ref } = Vue;
const mountPointId = "vue-app-capi";

import { product } from "./components/product.js";

const app = {
  template: `
    <h3>{{ msg || 'Welcome' }}</h3>
    <label class="default-label">Enter a Text</label>
    <input v-model="msg" type="text" class="default-textbox">
    <button @click="buyNow" class="default-btn mt-2">Buy Now</button>
    <product name="Camera" :price="300" @addToCart="addItemToCart"/>
  `,

  components: {
    product,
  },

  setup() {
    const msg = ref("Hello World");

    const buyNow = () => alert(msg.value);
    const addItemToCart = (item) => alert(`One ${item} added to the cart.`);

    return {
      msg,
      buyNow,
      addItemToCart,
    };
  },

  created() {
    console.log("The message is: " + this.msg);
  },
};

const Demo = createApp(app);
Demo.mount(`#${mountPointId}`);
