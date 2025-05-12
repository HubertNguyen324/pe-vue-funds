// This script is loaded by main.js for the "capital-of-france" interactive block.
// It assumes Vue is globally available.

(function () {
  const mountPointId = "vue-app-capital-of-france";
  const mountElement = document.getElementById(mountPointId);

  if (!mountElement) {
    console.error(
      `Mount point #${mountPointId} not found for Capital of France Vue app.`
    );
    return;
  }

  const { createApp, ref, onMounted } = Vue;

  createApp({
    setup() {
      const problem = ref({
        solutionVisible: false,
        enhanceAvailable: false,
      });

      const toggleSolution = () => {
        problem.value.solutionVisible = !problem.value.solutionVisible;
      };

      onMounted(() => {
        problem.value.enhanceAvailable = true;
      });

      return {
        problem,
        toggleSolution,
      };
    },
    template: `
          <div class="p-1"> <button v-if="problem.enhanceAvailable" @click="toggleSolution"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-3">
                  {{ problem.solutionVisible ? 'Hide' : 'Show' }} Solution
              </button>
              <div v-if="problem.solutionVisible"
                   class="solution-content p-4 bg-gray-50 border border-gray-200 rounded-md prose prose-sm max-w-none"> <p><strong>Solution (Interactive):</strong></p>
                  <p>The capital of France is Paris.</p>
                  <blockquote>
                      Paris is renowned for its art, fashion, gastronomy and culture.
                  </blockquote>
              </div>
              <div v-if="!problem.enhanceAvailable && typeof problem !== 'undefined'"
                   class="p-3 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-600">
                   Loading interactive solution...
              </div>
          </div>
      `,
  }).mount(`#${mountPointId}`);

  console.log(
    "Capital of France Vue app initialized and mounted (Tailwind version)."
  );
})();
