import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

API.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_API_KEY
  config.headers.Authorization = `Client-ID ${token}`
  return config
})

export default API