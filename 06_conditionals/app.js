const { createApp, ref } = Vue;

const mountPointId = "vue-app-item-list"; // for document rendering

const app = createApp({
  setup() {
    const header = ref("Listing App");
    // const items = ref([
    //   {
    //     id: 1,
    //     name: "item 1",
    //   },
    //   {
    //     id: 2,
    //     name: "item 2",
    //   },
    //   {
    //     id: 3,
    //     name: "item 3",
    //   },
    //   {
    //     id: 4,
    //     name: "item 4",
    //   },
    //   {
    //     id: 5,
    //     name: "item 5",
    //   },
    // ]);
    const items = ref([]);
    const newItem = ref("");
    const newItemPriory = ref("low");
    const newItemActive = ref(true);
    const editing = ref(false);

    const addItem = () => {
      items.value.push({ id: items.value.length + 1, name: newItem.value });
      newItem.value = "";
      newItemPriory.value = "low";
      newItemActive.value = true;
    };

    const toggleEditing = (e) => {
      editing.value = e;
    };

    return {
      header,
      items,
      newItem,
      newItemPriory,
      newItemActive,
      editing,
      addItem,
      toggleEditing,
    };
  },
  template: `
    <div class="mb-2">
      <button class="cancel-btn" v-if="editing" @click="toggleEditing(false)">Cancel</button>
      <button class="primary-btn" v-else @click="toggleEditing(true)">Edit Mode</button>
    </div>
    <form
      class="space-y-6 mb-10"
      v-if="editing"
      @submit.prevent="addItem">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-3">
        <div>
            <label class="default-label">Add a New Item</label>
            <input v-model.trim="newItem" type="text" placeholder="Enter the Name..." class="default-textbox">
        </div>
        <div>
            <label class="default-label">Priority</label>
            <select v-model="newItemPriory" class="default-selectbox">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
        </div>
        <div>
          <label class="default-label">Active</label>
          <input type="checkbox" v-model="newItemActive" class="default-checkbox">
        </div>
        <div>
          <button type="submit" class="default-btn">Add Item</button>
        </div>
      </div>
    </form>
    <ul class="styled-item-list">
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
    <p v-if="!items.length">The item list is empty.</p>
  `,
});

app.mount(`#${mountPointId}`);
