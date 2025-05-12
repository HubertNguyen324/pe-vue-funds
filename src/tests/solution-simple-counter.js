// This script is loaded by main.js for the "simple-counter" interactive block.
// It assumes Vue is globally available.

(function () {
  const mountPointId = "vue-app-simple-counter";
  const mountElement = document.getElementById(mountPointId);

  if (!mountElement) {
    console.error(
      `Mount point #${mountPointId} not found for Simple Counter Vue app.`
    );
    return;
  }

  const { createApp, ref, onMounted } = Vue;

  createApp({
    setup() {
      const count = ref(0);
      const enhanceAvailable = ref(false);

      // Sample data for the styled list
      const listItems = ref([
        {
          id: 1,
          title: "Feature A",
          description: "Description for feature A.",
        },
        { id: 2, title: "Service B", description: "Details about service B." },
        { id: 3, title: "Option C", description: "Information on option C." },
      ]);

      const increment = () => {
        count.value++;
      };
      const decrement = () => {
        count.value--;
      };

      onMounted(() => {
        enhanceAvailable.value = true;
      });

      return {
        count,
        increment,
        decrement,
        enhanceAvailable,
        listItems,
      };
    },
    template: `
            <div v-if="enhanceAvailable" class="p-1">
                <p class="text-lg font-semibold text-stone-700 mb-2">Current Count: <span class="text-sky-600">{{ count }}</span></p>
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

                <h4 class="text-md font-semibold text-stone-700 mb-2">Demo List:</h4>
                <ul class="styled-item-list">
                    <li v-for="item in listItems" :key="item.id">
                        <strong class="font-medium text-stone-800">{{ item.title }}:</strong> {{ item.description }}
                    </li>
                </ul>
            </div>
             <div v-else class="p-3 bg-stone-100 border border-stone-200 rounded-md text-sm text-stone-600">
                 Loading interactive counter...
            </div>
        `,
  }).mount(`#${mountPointId}`);

  console.log(
    "Simple Counter Vue app initialized and mounted (Easy Reading Theme with Styled List)."
  );
})();
