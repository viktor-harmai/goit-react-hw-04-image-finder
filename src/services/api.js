import axios from 'axios';

const API_KEY = '29484479-34e6c0d98a298c71636b4aafe';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchData = async (query, page) => {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  const { hits } = data;
  //   console.log(hits);
  return hits;
};
