import ApiClient from "../lib/apiClient.js";

const { computed, reactive, inject } = Vue;
const activeRequests = reactive([]);

export default function useRequest(resource) {
  const baseURL = inject("baseApiUrl");
  const isLoading = computed(() => activeRequests.length > 0);

  const { fetchAll, fetchOne } = ApiClient(baseURL, resource);

  const listAll = async () => {
    const index = addRequest(resource);
    const data = await fetchAll().catch((error) => {
      console.error("Failed to fetch data:", error);
    });
    activeRequests.splice(index, 1);
    return data;
  };

  const readOne = async (id) => {
    const index = addRequest(resource);
    const data = await fetchOne(Number(id)).catch((error) => {
      console.error("Failed to fetch data:", error);
    });
    activeRequests.splice(index, 1);
    return data;
  };

  const addRequest = (request) => {
    const index = activeRequests.length;
    activeRequests[index] = request;
    return index;
  };

  return {
    isLoading,
    listAll,
    readOne,
  };
}
