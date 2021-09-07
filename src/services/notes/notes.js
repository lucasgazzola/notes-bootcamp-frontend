import axios from "axios";
const BASE_URL = 'http://localhost:3000/api/notes/';

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then(res => res.data)
};

const create = newObj => {
  const request = axios.post(BASE_URL, newObj)
  return request.then(res => res.data)
};

const update = (id, newObj) => {
  const request = axios.post(`${BASE_URL}/${id}`, newObj);
  return request.then(res => res.data)
}

export { getAll, create, update }