export const PostCard = {
  props: ["post"],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
        <img src="https://placehold.co/600x400" :alt="'Thumbnail for ' + post.title" class="w-full h-48 object-cover rounded-t-lg mb-4">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">{{ post.title }}</h2>
        <p class="text-gray-600 text-sm mb-4">By {{ post.author }}</p>
        <router-link :to="'/post/' + post.id" class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
            Read More
        </router-link>
    </div>
    `,
};
