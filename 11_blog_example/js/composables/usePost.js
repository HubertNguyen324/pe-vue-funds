import useRequest from "../composables/useRequest.js";

const { ref } = Vue;

export default function usePost() {
  const posts = ref([]);
  const currentPost = ref({});

  const { listAll: fetchAllPosts, readOne: fetchOnePost } = useRequest("posts");
  const { readOne: fetchOneUser } = useRequest("users");

  const listAllPost = async () => {
    const postData = await fetchAllPosts();
    for (const post of postData) {
      const userData = await fetchOneUser(post.userId);
      post.author = userData.name;
      posts.value.push(post);
    }
  };

  const getPostData = async (id) => {
    const postData = await fetchOnePost(Number(id));
    const userData = await fetchOneUser(postData.userId);
    postData.author = userData.name;
    currentPost.value = postData;
  };

  return {
    posts,
    currentPost,
    listAllPost,
    getPostData,
  };
}
