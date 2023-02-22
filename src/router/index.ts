//Routing rules//

import { createRouter, createWebHistory } from 'vue-router'
import DatabaseViewerScreen from '../views/DatabaseViewerView.vue'
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
            path: "/database",
            name: "database",
            component: () => import('../views/DatabaseViewerView.vue')
        },
        {
            path: "/builder",
            name: "builder",
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
            component: DatabaseViewerScreen //temporarily database viewer 
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