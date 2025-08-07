export default function ApiClient(baseURL, resource) {
  const fetchAll = async () => makeRequest(`${baseURL}/${resource}`, resource);
  const fetchOne = async (id) =>
    makeRequest(`${baseURL}/${resource}/${id}`, resource + id);

  const makeRequest = async (url, key) => {
    if (loadCachedData(key)) {
      return loadCachedData(key);
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const loadCachedData = (key) => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  };

  return {
    fetchAll,
    fetchOne,
    loadCachedData,
  };
}
