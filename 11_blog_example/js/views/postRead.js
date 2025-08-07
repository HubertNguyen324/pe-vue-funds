import usePost from "../composables/usePost.js";

const { watch } = Vue;
const { useRoute } = VueRouter;

export const PostRead = {
  template: `
    <section class="bg-white p-8 rounded-xl shadow-lg transition-all">
      <router-link to="/" class="mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center w-max">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Back to Blog
      </router-link>
      <h2 class="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{{ currentPost.title }}</h2>
      <p class="text-gray-600 text-lg mb-6">By <span class="font-semibold">{{ currentPost.author }}</span></p>
      <img src="https://placehold.co/600x400" :alt="'Thumbnail for ' + currentPost.title" class="w-full h-48 object-cover rounded-t-lg mb-4">
      <div class="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed" v-html="currentPost.body"></div>
    </section>
  `,
  setup() {
    const route = useRoute();
    const { currentPost, getPostData } = usePost();

    watch(
      () => route.params.id,
      async (newId) => {
        await getPostData(newId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      { immediate: true }
    );

    return { currentPost };
  },
};
