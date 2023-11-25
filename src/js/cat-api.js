import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_TOqd7IGN5lBrMwZn0vsZzU8aBncUtVc6Pc3cBF5M0kymTblUl05RmPKRDExsWP3T';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}
