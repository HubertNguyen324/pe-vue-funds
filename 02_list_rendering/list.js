const { createApp, ref } = Vue;

const mountPointId = "vue-app-list"; // for document rendering

const app = createApp({
  setup() {
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
      items,
    };
  },
  template: `
    <div class="p-1">
      <ul class="styled-item-list">
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  `,
});

app.mount(`#${mountPointId}`);
