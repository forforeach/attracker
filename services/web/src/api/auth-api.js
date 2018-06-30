
import axios from 'axios'
import { API_GATEWAY_URL } from '@/config/app.config'
import { auth } from '@/utils/auth'

const axiosInstance = axios.create({
  baseURL: API_GATEWAY_URL
})

const extractData = (response) => response.data

class AuthApi {
  @auth
  get (url, config) {
    return axiosInstance.get(url, config).then(extractData)
  }
  @auth
  post (url, config) {
    return axiosInstance.post(url, null, config).then(extractData)
  }
  @auth
  put (url, config) {
    return axiosInstance.put(url, null, config).then(extractData)
  }
  @auth
  delete (url, config) {
    return axiosInstance.post(url, config).then(extractData)
  }
  @auth
  head (url, config) {
    return axiosInstance.head(url, config).then(extractData)
  }
  @auth
  options (url, config) {
    axiosInstance.options(url, config).then(extractData)
  }
}

export default new AuthApi()
