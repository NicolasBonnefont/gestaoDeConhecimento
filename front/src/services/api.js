import axios from 'axios'

const api = axios.create({
  baseURL:'http://localhost:3333',
  headers: {'Authorization': `bearer ${sessionStorage.getItem('logado')}`}
})

export default api