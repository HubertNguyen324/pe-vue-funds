import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  setup() {
    const header = ref("Listing App");
    const items = ref([
      {
        id: 1,
        name: "item 1",
      },
      {
        id: 2,
        name: "item 2",
      },
      {
        id: 3,
        name: "item 3",
      },
      {
        id: 4,
        name: "item 4",
      },
      {
        id: 5,
        name: "item 5",
      },
    ]);
    return {
      header,
      items,
    };
  },
  template: `
    <h1>{{ header }}</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  `,
});

app.mount("#app");
