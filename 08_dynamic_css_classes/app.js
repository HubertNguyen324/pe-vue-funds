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
        highPriority: false,
        done: true,
      },
      {
        id: 2,
        name: "item 2",
        highPriority: false,
        done: false,
      },
      {
        id: 3,
        name: "item 3",
        highPriority: true,
        done: true,
      },
      {
        id: 4,
        name: "item 4",
        done: true,
      },
      {
        id: 5,
        name: "item 5",
        highPriority: true,
        done: false,
      },
    ]);
    const newItem = ref("");
    const newItemHighPriority = ref(false);
    const newItemDone = ref(false);
    const editing = ref(false);

    const addItem = () => {
      items.value.push({
        id: items.value.length + 1,
        name: newItem.value,
        highPriority: newItemHighPriority.value,
        done: newItemDone.value,
      });
      newItem.value = "";
    };

    const enableEdit = (e) => {
      editing.value = e;
      newItem.value = "";
      newItemHighPriority.value = false;
      newItemDone.value = false;
    };

    const toogleDone = (item) => {
      item.done = !item.done;
    };

    return {
      header,
      items,
      newItem,
      newItemHighPriority,
      newItemDone,
      editing,
      addItem,
      enableEdit,
      toogleDone,
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
      <label><input type="checkbox" v-model="newItemHighPriority">High Priority</label>
      <label><input type="checkbox" v-model="newItemDone">Done</label>

      <button
        :disabled="newItem.length < 5"
        @click="addItem"
        class="btn btn-primary" >
        Add
      </button>
    </form>
    <ul>
      <li
        v-for="(