(function () {
  const { createApp, computed, ref, reactive } = Vue;

  const mountPointId = "vue-app-todo-list"; // for document rendering
  const dummyData = [
    {
      id: 1,
      name: "item 1",
      done: true,
      highPriority: true,
    },
    {
      id: 2,
      name: "item 2",
      done: false,
      highPriority: true,
    },
    {
      id: 3,
      name: "item 3",
      done: false,
      highPriority: false,
    },
    {
      id: 4,
      name: "item 4",
      done: true,
      highPriority: false,
    },
    {
      id: 5,
      name: "item 5",
      done: false,
      highPriority: true,
    },
  ];

  createApp({
    setup() {
      const items = ref(dummyData);
      const newItem = reactive({
        id: items.value.length + 1,
        name: "",
        done: false,
        highPriority: false,
      });
      const characterCount = computed(() => newItem.name.length);
      const selectedItems = ref([]);

      const addItem = () => {
        items.value.push({ ...newItem });
        newItem.id = items.value.length + 1;
        newItem.name = "";
        newItem.highPriority = false;
        newItem.done = false;
      };

      const toggleDone = (item) => {
        item.done = !item.done;
      };

      const deleteItem = (id) => {
        const index = items.value.findIndex((item) => item.id === id);
        if (index !== -1) {
          // Remove one element at the found index
          items.value.splice(index, 1);
        }
      };

      return {
        items,
        newItem,
        characterCount,
        selectedItems,
        addItem,
        toggleDone,
        deleteItem,
      };
    },
    template: `
    <form
      class="space-y-6 mb-10"
      @submit.prevent="addItem">
      <div class="grid grid-cols-4 gap-x-6 gap-y-4">
        <div class="col-span-2">
            <label class="default-label">Add a New Item ({{ characterCount }}/80)</label>
            <input v-model.trim="newItem.name" type="text" maxlength="80" placeholder="Enter the Name..." class="default-textbox">
        </div>
        <div class="col-span-1">
          <label class="default-label">High Priority</label>
          <input type="checkbox" v-model="newItem.highPriority" class="default-checkbox">
        </div>
        <div class="col-span-1">
          <label class="default-label">Done</label>
          <input type="checkbox" v-model="newItem.done" class="default-checkbox">
        </div>
      </div>
      <div>
          <button type="submit" :disabled="newItem.name.length < 5" class="default-btn">Add Item</button>
      </div>
    </form>
    <ul class="styled-item-list">
        <li class="flex items-center justify-between"
          v-for="item in items"
          :key="item.id"
          :class="{strikethrough: item.done, highPriority: item.highPriority}">
          <div class="flex items-center space-x-3">
            <input type="checkbox" v-model="item.done" class="item-list-checkbox">
            {{ item.name }}
          </div>
          <span>
            <button type="button" class="item-list-delete-btn" @click="deleteItem(item.id)">Ꭓ</button>
          </span>
        </li>
    </ul>
    <p v-if="!items.length">The item list is empty.</p>
  `,
  }).mount(`#${mountPointId}`);

  console.log("vue-app-todo-list initialized and mounted.");
})();
