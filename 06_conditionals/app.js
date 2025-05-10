import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  setup() {
    const header = ref("Listing App");
    const items = ref([]);
    const newItem = ref("");
    const newItemPriory = ref("low");
    const newItemActive = ref(true);
    const editing = ref(false);

    const addItem = () => {
      items.value.push({
        id: items.value.length + 1,
        name: newItem.value,
      });
      newItem.value = "";
    };

    const enableEdit = (e) => {
      editing.value = e;
      newItem.value = "";
    };

    return {
      header,
      items,
      newItem,
      newItemPriory,
      newItemActive,
      editing,
      addItem,
      enableEdit,
    };
  },
  template: `
    <div class="header">
      <h1>{{ header }}</h1>
      <button v-if="editing" class="btn" @click="enableEdit(false)">Cancel</button>
      <button v-else class="btn-primary" @click="enableEdit(true)">Add New Item</button>
    </div>
    <form
      class="add-item-form"
      v-if="editing"
      @submit.prevent="addItem">
      <input v-model.trim="newItem" type="text" placeholder="Add a new item...">
      Priority: 
      <select v-model="newItemPriory">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label><input type="checkbox" v-model="newItemActive">Active</label>

      <br>
        <button class="btn btn-primary" >
          Add
        </button>
      </br>
    </form>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
    <p v-if="!items.length">No items to display</p>
  `,
});

app.mount("#app");
