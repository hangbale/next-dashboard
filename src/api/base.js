import request from 'axios'


let base = request.create({
  baseURL: '/api',
})
base.interceptors.request.use((config) => {
  return config
})
base.interceptors.response.use((response) => {
    if(response.status === 200) {
        return response.data.data
    }
    if(response.status === 401) {
        // 未登录
        return response.data
    }
    return response
})


export default base
