const { createApp, ref } = Vue;

const mountPointId = "vue-app-list"; // for document rendering

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
    <h3>{{ header }}</h3>
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
          <button type="button" @click="items.push({ id: items.length + 1, name: newItem })" class="default-btn">Add Item</button>
        </div>
    </div>
    
    <ul class="styled-item-list">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  `,
});

app.mount(`#${mountPointId}`);
