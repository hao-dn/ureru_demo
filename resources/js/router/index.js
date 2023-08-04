import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        // redirect "/" to "/posts"
        {
            path: '/',
            redirect: '/posts'
        },
        {
            path: '/posts',
            name: 'Posts.List',
            component: () => import('../views/PostsView.vue'),
        },
        {
            path: '/posts/edit/:id',
            name: 'Post.Edit',
            component: () => import('../components/Posts/PostEditView.vue'),
        },
        {
            path:'/categories',
            name:'Categories.List',
            component: () => import('../views/CategoriesView.vue'),
        }
    ]
})

export default router;
