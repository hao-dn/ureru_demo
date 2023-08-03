import axios from "../../plugins/axios";

export default {
    async getPosts(params) {
        return await axios.get("/posts.json", {params});
    },
    async deletePost(id) {
        return await axios.delete(`/posts/${id}.json`);
    },
    async update2Post(id, data) {
        return await axios.put(`/posts/${id}.json`, data);
    }
};
