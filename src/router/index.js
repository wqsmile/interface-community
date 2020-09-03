import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultPage from '../views/DefaultPage.vue'
import MainPage from '../views/MainPage.vue'
import api from '@/http/api.js'
import cookie from '@/utils/cookie.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'defaultPage',
    component: DefaultPage,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'main',
        component: MainPage,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/community',
        name: 'community',
        component: () => import(/* webpckChunkName: 'community' */ '@/views/community/Community.vue'),
        meta: {
          requireAuth: true
        } 
      },
      {
        path: '/publisharticle',
        name: 'articlePublish',
        component: () => import(/* webpackChunkName: 'articlePublish' */ '@/components/ArticlePublish.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpckChunkName: 'user' */ '@/views/user/User.vue'),
        redirect: '/user/modifyInfo',
        meta: {
          requireAuth: true
        },
        children: [
          {
            path: '/user/modifyInfo',
            name: 'modifyInfo',
            component: () => import(/* webpackChunkName: 'user' */ '@/views/user/ModifyInfo.vue'),
            redirect: 'baseInfo',
            children: [
              {
                path: '',
                name: 'baseInfo',
                component: () => import(/* webpackChunkName: 'user' */ '@/components/modifyInfo/BaseInfo.vue')
              },
              {
                path: '',
                name: 'modifyProfile',
                component: () => import(/* webpackChunkName: 'user' */ '@/components/modifyInfo/ModifyProfile.vue')
              },
              {
                path: '',
                name: 'bindSync',
                component: () => import(/* webpackChunkName: 'user' */ '@/components/modifyInfo/BindSync.vue')
              },
              {
                path: '',
                name: 'modifyPassword',
                component: () => import(/* webpackChunkName: 'user' */ '@/components/modifyInfo/ModifyPassword.vue')
              },
            ]
          },
          {
            path: ':name',
            name: 'myArticle',
            component: () => import(/* webpackChunkName: 'user' */ '@/views/user/MyArticle.vue')
          },
          {
            path: ':name',
            name: 'myMessage',
            component: () => import(/* webpackChunkName: 'user' */ '@/views/user/MyMessage.vue')
          },
          {
            path: ':name',
            name: 'privateMessge',
            component: () => import(/* webpackChunkName: 'user' */ '@/views/user/PrivateMessge.vue')
          },
          {
            path: ':name',
            name: 'myCollection',
            component: () => import(/* webpackChunkName: 'user' */ '@/views/user/MyCollection.vue')
          },
          {
            path: ':name',
            name: 'applyCertification',
            component: () => import(/* webpackChunkName: 'user' */ '@/views/user/ApplyCertification.vue')
          }
        ]
      },
      {
        path: '/details/:id',
        name: 'documentDetails',
        component: () => import(/* webpackChunkName: 'documentDetails' */ '@/views/document/DocumentDetails.vue'),
        meta: {
          requireAuth: true
        }        
      },
      {
        path: '/article/:article_id',
        name: 'articleDetails',
        component: () => import(/* webpackChunkName: 'articleDetails' */ '@/views/community/ArticleDetails.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */ '@/components/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {


  if (to.matched.some(item => item.meta.requireAuth)) {
    let authorization = cookie.get('authorization')
    if (!authorization || authorization !== localStorage.getItem('authorization')) {
      localStorage.clear()
      next('/login')
      return
    }
    // api.loginValid().then(res => {
    //   console.log('loginValid', res);
    //   if (res && res.msg === '不能重复登录') {
    //     next()
    //   } else {
    //     next('/login')
    //   }
    // })
    next();
    return;
  }
  next();
})

export default router
