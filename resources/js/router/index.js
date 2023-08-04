import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routesWithPrefix = (prefix, routes) => {
    return routes.map(route => {
        route.path = `${prefix}${route.path}`

        return route
    })
}
const router = new VueRouter({
    mode: 'history',
    routes: [
        // redirect "/" to "/posts"
        {path: '/', redirect: '/vue/posts'},
        ...routesWithPrefix('/vue', [
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
                path: '/posts/add',
                name: 'Post.Add',
                component: () => import('../components/Posts/PostCreateView.vue'),
            },
            {
                path: '/categories',
                name: 'Categories.List',
                component: () => import('../views/CategoriesView.vue'),
            }
        ]),
    ]
})

export default router;
