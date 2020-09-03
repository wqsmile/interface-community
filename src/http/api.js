import axios from './index'
import qs from 'qs'

const instance = axios.create({
  headers:{
    'content-type': 'application/x-www-form-urlencoded',
  }
});
instance.interceptors.response.use(res => {
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

instance.interceptors.request.use(req => {
  req.headers = Object.assign(req.headers, {
    'authorization': localStorage.getItem('authorization') || ''
  })
  
  // console.log('instance', req);

  return req
}, err => {
  return Promise.reject(err)
})

const api = {
  // 注册邮箱
  registerEmail: (email, password) => {
    return instance.post('/api/v1/verifyEmail', qs.stringify({
      email: email,
      password: password
    }))
  },
  // 登录验证
  loginValid: (email, password) => {
    return instance.post('/signIn', qs.stringify({
      email: email,
      password: password,
    }))
  },
  // 获取用户信息
  getUserInfo: (authorization = '') => {
    return axios.get('/api/v1/getUserInfo', {
      params: {
        authorization: authorization
      }
    })
  },
  // 注销
  logout: () => {
    return axios.get('/logout')
  },
  // 首页
  getHome: () => {
    return axios.get('/api/v1/home')
  },
  // 文档页左侧菜单
  getDomMenu: id => {
    return axios.get('/api/v1/fileMenu', {
      params: {
        theme_id: id
      }
    })
  },
  // 获取文档页对应内容
  getDomContent: id => {
    return axios.get('/api/v1/file', {
      params: {
        file_id: id
      }
    })
  },
  // 社区页主题
  getTalkTheme: () => {
    return axios.get('/api/v1/talkTheme')
  },
  // 社区置顶文章
  getTopArticle: () => {
    return axios.get('/api/v1/talkTopArticle')
  },
  // 社区全部文章列表
  getAllArticle: (type = '') => {
    return axios.get('/api/v1/talkAllArticle', {
      params: {
        type: type
      }
    })
  },
  // 社区主题文章列表
  getThemeArticle: (id, type = '') => {
    return axios.get('/api/v1/talkThemeArticle', {
      params: {
        theme_id: id,
        type: type
      }
    })
  },
  // 社区发布文章
  publishArticle: (id, title, content, is_comment = 0) => {
    return instance.post('/api/v1/publishArticle', qs.stringify({
      theme_id: id,
      title: title,
      content: content,
      is_comment: is_comment
    }))
  },
  // 获取社区文章内容
  getArticleContent: id => {
    return axios.get('/api/v1/articleShow', {
      params: {
        article_id: id
      }
    })
  },
  // 获取社区评论
  getArticleComment: id => {
    return axios.get('/api/v1/getArticleReply', {
      params: {
        article_id: id
      }
    })
  },
  // 社区一级评论添加
  addComment: (a_id, content) => {
    return instance.post('/api/v1/articleReply', qs.stringify({
      article_id: a_id,
      content: content
    }))
  },
  // 社区二级评及以上论添加
  addComment2: (c_id, a_id, content) => {
    return instance.post('/api/v1/articleReply', qs.stringify({
      parent_id: c_id,
      article_id: a_id,
      content: content
    }))
  },
  // 修改头像
  modifyProfile: file => {
    return instance.post('/api/v1/modifyPhoto', file, {
      headers:{'Content-Type':'multipart/form-data'}
    })
  },
  // 修改密码
  modifyPassword: (oldPwd, newPwd) => {
    return instance.put('/api/v1/modifyPassword', qs.stringify({
      old_password: oldPwd,
      new_password: newPwd
    }))
  }
}

export default api