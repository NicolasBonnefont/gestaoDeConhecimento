import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

api.interceptors.request.use(function (token) {
  token.headers.Authorization = `bearer ${sessionStorage.getItem('logado')}`
  return token
})

export default api