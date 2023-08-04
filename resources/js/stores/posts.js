import {defineStore} from 'pinia'
import PostsService from "../services/api/posts";

export const postsStore = defineStore('posts', {
    state: () => {
        return {
            posts: [],
            total: 0,
            post: {}
        }
    },
    getters: {
        getPost: (state) => state.post ?? {},
        getPosts: (state) => state.posts ?? [],
        getTotal: (state) => state.total ?? 0
    },
    actions: {
        async fetchPosts(params) {
            try {
                const response = await PostsService.getPosts(params);
                this.posts = response.data.data;
                this.total = response.data.pagination.count;
            } catch (e) {
                console.log(e);
            }
        },
        async deletePost(id) {
            return await PostsService.deletePost(id);
        },
        async updatePost(id, data) {
            return await PostsService.update2Post(id, data);
        },
        async createPost(data) {
            return await PostsService.createPost(data);
        },
        async fetchPost(id) {
            try {
                const response = await PostsService.getPost(id);
                this.post = response.data.data;
            } catch (e) {
                console.log(e);
            }
        }
    }
})
