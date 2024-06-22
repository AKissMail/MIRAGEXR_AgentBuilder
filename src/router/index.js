import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../views/UserLogin.vue';
import UserDashboard from '../views/UserDashboard.vue';
import TestConfiguration from '../views/TestConfiguration.vue';
import CreateConfiguration from '../views/CreateConfiguration.vue';
import UserUpload from '../views/UserUpload.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: UserLogin
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: UserDashboard,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'test-configuration',
                name: 'TestConfiguration',
                component: TestConfiguration,
                meta: { requiresAuth: true }
            },
            {
                path: 'create-configuration',
                name: 'CreateConfiguration',
                component: CreateConfiguration,
                meta: { requiresAuth: true }
            },
            {
                path: 'upload',
                name: 'UserUpload',
                component: UserUpload,
                meta: { requiresAuth: true }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = localStorage.getItem('token');

    if (requiresAuth && !token) {
        next('/');
    } else {
        next();
    }
});

export default router;
