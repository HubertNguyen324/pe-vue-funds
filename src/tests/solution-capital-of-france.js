// This script is loaded by main.js for the "capital-of-france" interactive block.
// It assumes Vue is globally available.

(function () {
  const mountPointId = "vue-app-capital-of-france"; // Must match ID in training-content.md
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
        // Clear noscript content if Vue is enhancing this specific part
        const noscriptContent =
          mountElement.querySelector(".noscript-solution");
        if (noscriptContent) {
          //  noscriptContent.remove(); // Or hide it, depending on desired behavior
        }
      });

      return {
        problem,
        toggleSolution,
      };
    },
    // Template for this specific Vue app
    // This will be rendered inside the div with id="vue-app-capital-of-france"
    template: `
            <div>
                <button v-if="problem.enhanceAvailable" @click="toggleSolution" class="toggle-button">
                    {{ problem.solutionVisible ? 'Hide' : 'Show' }} Solution
                </button>
                <div v-if="problem.solutionVisible" class="solution-content p-3 bg-white border rounded-md mt-2">
                    <p><strong>Solution (Interactive):</strong></p>
                    <p>The capital of France is Paris.</p>
                    <blockquote>
                        Paris is renowned for its art, fashion, gastronomy and culture.
                    </blockquote>
                </div>
                <div v-if="!problem.enhanceAvailable && typeof problem !== 'undefined'" class="p-3 bg-gray-50 border rounded-md text-sm text-gray-600">
                     Loading interactive solution...
                </div>

            </div>
        `,
  }).mount(`#${mountPointId}`);

  console.log("Capital of France Vue app initialized and mounted.");
})();
