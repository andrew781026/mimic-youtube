import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import(/* webpackChunkName: "home" */ '../components/VideoPlayer.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import( '../views/List.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import( '../views/Detail.vue')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import( '../views/Play.vue')
  },
  {
    path: "*",
    redirect: {name: 'Home'}
  },
]

const router = new VueRouter({
  // base: process.env.NODE_ENV === 'production' ? '/cloud-drive/' : '/',
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes,
})

export default router
