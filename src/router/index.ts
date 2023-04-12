import { createRouter, createWebHistory } from 'vue-router'
import DatabaseManagerView from '../views/DatabaseManagerView.vue'
import NotFoundErrorView from '../views/NotFoundErrorView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/database-connections",
            name: "database-connections",
            component: () => import('../views/DatabaseManagerView.vue')
        },
        {
            path: "/database-viewer",
            name: "database-viewer",
            component: () => import('../views/DatabaseViewerView.vue')
        },
        {
            path: "/query-builder",
            name: "query-builder",
            component: () => import('../views/QueryBuilderView.vue')
        },
        {
            path: "/templates",
            name: "templates",
            component: () => import('../views/TemplateManagerView.vue')
        },
        {
            path: "/query-manager",
            name: "query-manager",
            component: () => import('../views/QueryManagerView.vue')
        },
        {
            path: '/',
            name: 'home',
            component: DatabaseManagerView //temporarily database viewer 
        },
        {
            path: '/reports',
            name: 'reports',
            component: () => import('../views/ReportsView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: "/:pathMatch(.*)*",
            name: 'notfound',
            component: NotFoundErrorView
            //component: () => import('../views/NotFoundErrorView.vue')
        }
    ]
})

export default router