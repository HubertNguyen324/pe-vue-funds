// This script is loaded by main.js for the "simple-counter" interactive block.
// It assumes Vue is globally available.

(function () {
  const mountPointId = "vue-app-simple-counter"; // Must match ID in training-content.md
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

      const increment = () => {
        count.value++;
      };
      const decrement = () => {
        count.value--;
      };

      onMounted(() => {
        enhanceAvailable.value = true;
        // Clear noscript content if Vue is enhancing this specific part
        const noscriptContent =
          mountElement.querySelector(".noscript-solution");
        if (noscriptContent) {
          // noscriptContent.remove();
        }
      });

      return {
        count,
        increment,
        decrement,
        enhanceAvailable,
      };
    },
    template: `
            <div v-if="enhanceAvailable" class="p-3 bg-white border rounded-md">
                <p class="text-lg font-semibold">Current Count: {{ count }}</p>
                <div class="mt-2 space-x-2">
                    <button @click="increment" class="toggle-button bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">Increment +</button>
                    <button @click="decrement" class="toggle-button bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">Decrement -</button>
                </div>
            </div>
             <div v-else class="p-3 bg-gray-50 border rounded-md text-sm text-gray-600">
                 Loading interactive counter...
            </div>
        `,
  }).mount(`#${mountPointId}`);

  console.log("Simple Counter Vue app initialized and mounted.");
})();
