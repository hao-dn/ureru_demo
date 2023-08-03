import {defineStore} from 'pinia'
import CategoriesService from "../services/api/categories";

export const categoriesStore = defineStore('categoriesStore', {
    state: () => {
        return {
            categories: [],
            total: 0
        }
    },
    getters: {
        getCategories: (state) => state.categories ?? [],
        getTotal: (state) => state.total ?? 0
    },
    actions: {
        async fetchCategories(params) {
            const response = await CategoriesService.getCategories(params);
            this.categories = response.data.data;
            this.total = response.data?.pagination?.count;
            return response;
        },
        async deleteCategory(id) {
            return await CategoriesService.deleteCategory(id);
        },
        async updateCategory(id, data) {
            return await CategoriesService.updateCategory(id, data);
        },
        async createCategory(data) {
            return await CategoriesService.createCategory(data);
        }
    }
})
