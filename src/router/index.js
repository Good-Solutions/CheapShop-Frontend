import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
    },

    {
        path: '/products',
        name: 'products',
        component: () => import('../components/products/products')
    },
    {
        path: '/products/new',
        name: 'add-product',
        component: () => import('../components/products/add-product')
    },
    {
        path: '/product/:id',
        name: 'edit-product',
        component: () => import('../components/products/edit-product')
    },

    {
        path: '/orders',
        name: 'orders',
        component: () => import('../components/orders/orders')
    },
    {
        path: '/orders/new',
        name: 'add-order',
        component: () => import('../components/orders/add-order')
    },
    {
        path: '/order/:id',
        name: 'edit-order',
        component: () => import('../components/orders/edit-order')
    },

    {
        path: '/categories',
        name: 'categories',
        component: () => import('../components/categories/categories')
    },
    {
        path: '/category/new',
        name: 'add-category',
        component: () => import('../components/categories/add-category')
    },
    {
        path: '/category/:id',
        name: 'edit-category',
        component: () => import('../components/categories/edit-category')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
