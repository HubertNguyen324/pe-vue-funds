const { createApp, ref, computed } = Vue;

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
    highPriority: false,
  },
];

const app = createApp({
  setup() {
    const items = ref(dummyData);
    const newItem = ref("");
    const newItemHighPriory = ref(false);
    const newItemDone = ref(false);
    const characterCount = computed(() => newItem.value.length);
    const sortReversed = ref(false);
    const sortLabel = ref("↓ Sort by Created");
    const displayList = computed(() => {
      if (sortReversed.value) {
        return [...items.value].reverse();
      } else {
        return items.value;
      }
    });

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

    const toggleSort = () => {
      sortReversed.value = !sortReversed.value;
      if (sortReversed.value) {
        sortLabel.value = "↑ Sort by Created";
      } else {
        sortLabel.value = "↓ Sort by Created";
      }
    };

    return {
      items,
      newItem,
      newItemHighPriory,
      newItemDone,
      characterCount,
      displayList,
      sortLabel,
      sortReversed,
      addItem,
      toggleDone,
      toggleSort,
    };
  },
  template: `
    <form
      class="space-y-6 mb-10"
      @submit.prevent="addItem">
      <div class="grid grid-cols-4 gap-x-6 gap-y-4">
        <div class="col-span-2">
            <label class="default-label">Add a New Item ({{ characterCount }}/80)</label>
            <input v-model.trim="newItem" type="text" maxlength="80" placeholder="Enter the Name..." class="default-textbox">
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
    <button :disabled="items.length < 1" @click="toggleSort" class="default-btn">{{ sortLabel }}</button>
    <ul class="styled-item-list">
        <li v-for="item in displayList" :key="item.id"
          :class="{strikethrough: item.done, highPriority: item.highPriority}"
          @click="toggleDone(item)">{{ item.name }}</li>
    </ul>
    <p v-if="!items.length">The item list is empty.</p>
  `,
});

app.mount(`#${mountPointId}`);
