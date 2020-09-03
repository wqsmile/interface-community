import axios from 'axios'
import cookie from '@/utils/cookie.js'


axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://breath.host' : '/api'
// console.log('baseURL', axios.defaults.baseURL);

axios.interceptors.response.use(res => {
  // console.log('resp', res);
  if (res.status === 200) {
    return res.data
  }
  if (res.status === 202) {
    return
  }
  return res
}, err => {
  if (err.response) {
    console.log('响应时错误');
  } else if (err.request) {
    console.log('请求时错误');
  }
  return Promise.reject(err)
})

axios.interceptors.request.use(req => {
  req.headers = Object.assign(req.headers, {
    'authorization': localStorage.getItem('authorization') || ''
  })

  // console.log('axios', req);

  return req
}, err => {
  return Promise.reject(err)
})

export default axios
