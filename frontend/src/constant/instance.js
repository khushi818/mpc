import axios from 'axios'
import { BASE_URL } from './url'

let token = JSON.parse(sessionStorage.getItem("auth")) ? JSON.parse(sessionStorage.getItem("auth")).token : "";

console.log(token)

const instance = axios.create({
  baseURL : BASE_URL,
})

instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default instance

