import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('@/pages/home/index.vue')
    },
    {
        path: '/making',
        name: 'making',
        component: () =>
            import ('@/pages/making/making-pages.vue')
    },
    {
        path: '/works',
        name: 'works',
        meta: {
            keepAlive: true
        },
        component: () =>
            import ('@/pages/works/index copy.vue')
    },
    {
        path: '/works/detail',
        name: 'detail',
        component: () =>
            import ('@/pages/works/detail')
    }
]

const router = new VueRouter({
    routes
})

export default router