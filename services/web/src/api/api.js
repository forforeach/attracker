import axios from 'axios'
import { API_GATEWAY_URL } from '@/config/app.config'

const axiosInstance = axios.create({
  baseURL: API_GATEWAY_URL
})

const extractData = (response) => response.data

export default {
  request (config) {
    return axiosInstance.request(config).then(extractData)
  },
  get (url, config) {
    console.log('here')
    return axiosInstance.get(url, config).then(extractData)
  },
  post (url, config) {
    return axiosInstance.post(url, null, config).then(extractData)
  },
  put (url, config) {
    return axiosInstance.put(url, null, config).then(extractData)
  },
  delete (url, config) {
    return axiosInstance.post(url, config).then(extractData)
  },
  head (url, config) {
    return axiosInstance.head(url, config).then(extractData)
  },
  options (url, config) {
    axiosInstance.options(url, config).then(extractData)
  }
}
