(function () {
  const { createApp, ref } = Vue;

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
      const newItem = ref("");
      const newItemHighPriory = ref(false);
      const newItemDone = ref(false);

      const addItem = () => {
        items.value.push({
          id: items.value.length + 1,
          name: newItem.value,
          highPriority: newItemHighPriory.value,
          done: newItemDone.value,
        });
        newItem.value = "";
        newItemHighPriory.value = false;
        newItemDone.value = false;
      };

      const toggleDone = (item) => {
        item.done = !item.done;
      };

      return {
        items,
        newItem,
        newItemHighPriory,
        newItemDone,
        addItem,
        toggleDone,
      };
    },
    template: `
    <form
      class="space-y-6 mb-10"
      @submit.prevent="addItem">
      <div class="grid grid-cols-4 gap-x-6 gap-y-4">
        <div class="col-span-2">
            <label class="default-label">Add a New Item</label>
            <input v-model.trim="newItem" type="text" placeholder="Enter the Name..." class="default-textbox">
        </div>
        <div class="col-span-1">
          <label class="default-label">High Priority</label>
          <input type="checkbox" v-model="newItemHighPriory" class="default-checkbox">
        </div>
        <div class="col-span-1">
          <label class="default-label">Done</label>
          <input type="checkbox" v-model="newItemDone" class="default-checkbox">
        </div>
      </div>
      <div>
          <button :disabled="newItem.length < 5" class="default-btn">Add Item</button>
      </div>
    </form>
    <ul class="styled-item-list">
        <li v-for="item in items" :key="item.id"
          :class="{strikethrough: item.done, highPriority: item.highPriority}"
          @click="toggleDone(item)">{{ item.name }}</li>
    </ul>
    <p v-if="!items.length">The item list is empty.</p>
  `,
  }).mount(`#${mountPointId}`);

  console.log("vue-app-todo-list initialized and mounted.");
})();
