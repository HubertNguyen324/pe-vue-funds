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
    const newItem = ref("");
    const newItemPriory = ref("low");
    const newItemActive = ref(true);

    return {
      header,
      items,
      newItem,
      newItemPriory,
      newItemActive,
    };
  },
  template: `
    <h1>{{ header }}</h1>
    <input v-model.trim="newItem" type="text" placeholder="Add a new item...">
    Priority: 
    <select v-model="newItemPriory">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <label><input type="checkbox" v-model="newItemActive">Active</label>
    <button @click="items.push({ id: items.length + 1, name: newItem })">Add Item</button>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  `,
});

app.mount("#app");
