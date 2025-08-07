const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

import { HomeView } from "./views/home.js";
import { PostRead } from "./views/postRead.js";
import useRequest from "./composables/useRequest.js";

const routes = [
  { path: "/", component: HomeView },
  { path: "/post/:id", component: PostRead, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const appConfig = {
  template: `
    <main class="container mx-auto p-6 flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <div v-if="isLoading" class="flex justify-center items-center h-96">
        <div class="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
      </div>
    </main>
  `,
  setup() {
    const { isLoading } = useRequest();
    return { isLoading };
  },
};
const app = createApp(appConfig);
app.use(router);
app.provide("baseApiUrl", "https://jsonplaceholder.typicode.com");
app.mount("#app");
