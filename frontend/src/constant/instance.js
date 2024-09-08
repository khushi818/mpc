import axios from 'axios'
import { BASE_URL } from './url'

let token = JSON.parse(sessionStorage.getItem("auth")) ? JSON.parse(sessionStorage.getItem("auth")).token : "";

// console.log(token)

const instance = axios.create({
  baseURL : BASE_URL,
})

instance.interceptors.request.use(
  (config) => {
    // Get the token from sessionStorage (or localStorage if using localStorage)
    const token = JSON.parse(sessionStorage.getItem("auth")) ? JSON.parse(sessionStorage.getItem("auth")).token : "";
    // You can switch to localStorage if needed

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add the token to Authorization header
    }

    return config;
  },
  (error) => {
    // Handle the request error here
    return Promise.reject(error);
  }
);

// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default instance

