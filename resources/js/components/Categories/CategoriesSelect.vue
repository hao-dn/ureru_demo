<template>
    <el-select placeholder="Select"
               filterable
               v-loading="fetching" v-model="valueSelected" v-on:change="updateValue">
        <el-option
            :key="null"
            :label="'All'"
            :value="null" v-if="!withoutAll"></el-option>
        <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>
<script>
import {onMounted, reactive, ref, watch} from "vue";
import {categoriesStore} from "../../stores/categories";
import {mapState} from "pinia";

export default {
    name: "CategoriesSelect",
    props: {
        category_id: {
            default: null
        },
        withoutAll: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        updateValue: function () {
            this.$emit('update-category', this.valueSelected);
            this.$emit('input', this.valueSelected);
        }
    },
    setup(props) {
        const query = reactive(
            {}
        );
        const valueSelected = ref(props.category_id);
        const fetching = ref(false);
        const useCategoriesStore = categoriesStore();
        const fetchCategories = async () => {
            fetching.value = true;
            try {
                await useCategoriesStore.fetchCategories(query);
            } catch (e) {
                console.log(e);
            }
            fetching.value = false;
        }
        onMounted(async () => {
            await fetchCategories(query);
        });
        watch(() => props.category_id, async (newValue) => {
            valueSelected.value = newValue;
        });
        return {
            fetching,
            fetchCategories,
            valueSelected
        }
    },
    computed: {
        ...mapState(categoriesStore, {
            categories: "getCategories",
            total: "getTotal",
        })
    }

}
</script>
<style scoped>

</style>
