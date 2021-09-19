import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/notes/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then(res => res.data)
}

const create = (newObj) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(BASE_URL, newObj, config)
  return request.then(res => res.data)
}

const update = (id, newObj) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(`${BASE_URL}/${id}`, newObj, config)
  return request.then(res => res.data)
}

export default { getAll, create, update, setToken }
