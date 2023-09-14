const fetchApi = async (url) => {
  const response = await fetch(url);
  const fullOverview = await response.json();
  return fullOverview;
};

export { fetchApi };
