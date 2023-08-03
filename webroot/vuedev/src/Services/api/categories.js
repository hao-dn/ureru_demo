import axios from "../../plugins/axios";

export default {
    async getCategories(params) {
        return await axios.get("/categories.json", {params});
    },
    async deleteCategory(id) {
        return await axios.delete(`/categories/${id}.json`);
    },
    async updateCategory(id, data) {
        return await axios.put(`/categories/${id}.json`, data);
    },
    async createCategory(data) {
        return await axios.post(`/categories.json`, data);
    }
};
