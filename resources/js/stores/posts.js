import {defineStore} from 'pinia'
import PostsService from "../services/api/posts";

export const postsStore = defineStore('posts', {
    state: () => {
        return {
            posts: [],
            total: 0
        }
    },
    getters: {
        getPosts: (state) => state.posts ?? [],
        getTotal: (state) => state.total ?? 0
    },
    actions: {
        async fetchPosts(params) {
            const response = await PostsService.getPosts(params);
            try {
                this.posts = response.data.data;
                this.total = response.data.total;
            } catch (e) {
                console.log(e);
            }
            return response;
        },
        async deletePost(id) {
            return await PostsService.deletePost(id);
        },
        async updatePost(id, data) {
            return await PostsService.update2Post(id, data);
        }
    }
})
