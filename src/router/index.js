import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    // ---------Products
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/products')
    },
    {
        path: '/products/:id',
        name: 'product-detail',
        component: () => import('../views/product-detail')
    },
    // Admin products
    {
        path: '/admin-products',
        name: 'admin-products',
        component: () => import('../components/products/admin-products')
    },
    {
        path: '/admin-products/new',
        name: 'add-product',
        component: () => import('../components/products/add-product')
    },
    {
        path: '/admin-product/:id',
        name: 'edit-product',
        component: () => import('../components/products/edit-product')
    },

    // ---------Orders
    {
        path: '/admin-orders',
        name: 'orders',
        component: () => import('../components/orders/admin-orders')
    },
    {
        path: '/admin-orders/new',
        name: 'add-order',
        component: () => import('../components/orders/add-order')
    },
    {
        path: '/admin-order/:id',
        name: 'edit-order',
        component: () => import('../components/orders/edit-order')
    },

    // ---------Categories
    {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/categories')
    },
    // Admin categories
    {
        path: '/admin-categories',
        name: 'admin-categories',
        component: () => import('../components/categories/admin-categories')
    },
    {
        path: '/admin-category/new',
        name: 'add-category',
        component: () => import('../components/categories/add-category')
    },
    {
        path: '/admin-category/:id',
        name: 'edit-category',
        component: () => import('../components/categories/edit-category')
    },

    // ---------User
    {
        path: '/profile/:id',
        name: 'profile',
        component: () => import('../views/profile')
    },
    // Admin users
    {
        path: '/admin-users',
        name: 'admin-users',
        component: () => import('../components/users/admin-users')
    },
    {
        path: '/admin-users/new',
        name: 'add-user',
        component: () => import('../components/users/add-user')
    },
    {
        path: '/admin-users/:id',
        name: 'edit-user',
        component: () => import('../components/users/edit-user')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router