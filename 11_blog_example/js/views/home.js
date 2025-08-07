const { onMounted } = Vue;

import usePost from "../composables/usePost.js";
import { PostCard } from "../components/postCard.js";

export const HomeView = {
  components: { PostCard },
  template: `
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </section>
    `,
  setup() {
    const { posts, listAllPost } = usePost();

    onMounted(() => {
      listAllPost();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return { posts };
  },
};
