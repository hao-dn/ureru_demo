<template>
    <div>
        <el-row>
            <category-table v-bind:query="query"/>
        </el-row>
    </div>
</template>
<script>
import {reactive} from "vue";
import CategoryTable from "../components/Categories/CategoryTable.vue";

export default {
    name: "CategoriesView",
    components: {
        CategoryTable
    },
    data() {
        const query = reactive(
            {
                name: null,
                page: 1,
                limit: 5,
                sort: 'id',
                id: null,
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
