import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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

    component: () =>
      import(/* webpackChunkName: "PostFrom" */ '../views/List.vue')
  },
  {
    path: '/detail',
    name: 'detail',

    component: () =>
      import(/* webpackChunkName: "PostFrom" */ '../views/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
