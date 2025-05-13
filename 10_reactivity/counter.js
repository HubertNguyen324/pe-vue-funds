(function () {
  const mountPointId = "vue-app-counter"; // for document rendering

  const { createApp, reactive } = Vue;

  createApp({
    setup() {
      const state = reactive({
        count: 0,
      });

      const increment = () => {
        state.count++;
      };

      const decrement = () => {
        state.count--;
      };

      return {
        state,
        increment,
        decrement,
      };
    },
    template: `
      <p class="text-lg font-semibold text-stone-700 mb-2">Current Count: <span class="text-sky-600">{{ state.count }}</span></p>
      <div class="mt-2 space-x-2 mb-6">
        <button @click="increment"
                class="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Increment +
        </button>
        <button @click="decrement"
                class="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
            Decrement -
        </button>
      </div>
    `,
  }).mount(`#${mountPointId}`);

  console.log("vue-app-counter initialized and mounted.");
})();
