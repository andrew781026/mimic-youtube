import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/video',
                name: 'Video',
                component: () => import( '../components/VideoPlayer.vue')
            },
            {
                path: '/star',
                name: 'Star',
                component: () => import('../views/Stars.vue')
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
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: "*",
        redirect: {name: 'Login'}
    },
]

const router = new VueRouter({
    // base: process.env.NODE_ENV === 'production' ? '/cloud-drive/' : '/',
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes,
})

export default router
