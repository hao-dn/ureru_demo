<template>
    <div>
        <el-row>
            <el-col :span="12">
                <categories-select v-bind:category_id="query.category_id" @update-category="updateCategory"/>
            </el-col>
        </el-row>
        <el-row>
            <post-table v-bind:query="query"/>
        </el-row>
    </div>
</template>
<script>
import CategoriesSelect from "../components/Categories/CategoriesSelect.vue";
import {reactive} from "vue";
import PostTable from "../components/Posts/PostTable.vue";

export default {
    name: "PostsView",
    components: {
        CategoriesSelect,
        PostTable
    },
    data() {
        const query = reactive(
            {
                name: null,
                page: 1,
                limit: 5,
                sort: 'id',
                category_id: null,
                direction: 'desc'
            }
        );
        return {
            query
        }
    },
    methods: {
        updateCategory(value) {
            this.query.category_id = value;
        }
    }
}
</script>
