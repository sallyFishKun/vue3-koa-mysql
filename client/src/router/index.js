import { createRouter, createWebHashHistory } from 'vue-router'
import List from '../views/List.vue'

const routes = [
  {
    path: '/',
    name: 'home',

    component: List
  },
  {
    path: '/post',
    name: 'post',

    component: () =>
      import(/* webpackChunkName: "PostFrom" */ '../views/PostFrom.vue')
  },
  {
    path: '/list',
    name: 'list',

    component: List
  },
  {
    path: '/detail',
    name: 'detail',

    component: () =>
      import(/* webpackChunkName: "PostFrom" */ '../views/Detail.vue')
  },
  {
    path: '/admindetail',
    name: 'admindetail',

    component: () =>
      import(/* webpackChunkName: "PostFrom" */ '../views/AdminDetail.vue')
  },
  {
    path: '/echarts',
    name: 'echarts',

    component: () =>
      import(/* webpackChunkName: "PostFrom" */ '../views/EchartsView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
