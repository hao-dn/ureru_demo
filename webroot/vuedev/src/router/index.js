import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        //redirect "/" to "/posts"
        // {
        //     path: '/',
        //     redirect: '/posts'
        // },
        {
            path: '/posts',
            name: 'Posts.List',
            component: () => import('../views/PostsView.vue'),
        },
        // {
        //     path: '/posts/:id',
        //     name: 'Post',
        //     component: () => import('../views/PostView.vue'),
        // },
        {
            path:'/categories',
            name:'Categories.List',
            component: () => import('../views/CategoriesView.vue'),
        }
    ]
})

export default router;
