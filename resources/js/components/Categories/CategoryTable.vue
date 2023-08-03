<template>
    <div>
        <el-row>
            <el-button type="primary" @click="clickCreate">
                <font-awesome-icon icon="fa-solid fa-user-secret"/>
                Create
            </el-button>
        </el-row>
        <el-table
            v-loading="fetching"
            :data="categories"
            style="width: 100%"
            :default-sort="{prop: 'id', order: 'descending'}"
            @sort-change="sortChange"
            :row-class-name="tableRowClassName">
            <el-table-column
                prop="id"
                label="ID"
                sortable="custom"
                class="d-flex"
                width="200">
                <template slot="header" slot-scope="scope">

                    <div style="width: 100%">
                        <span>ID</span>
                    </div>
                    <el-input
                        type="number"
                        v-model="query.id"
                        style="width: 50%"
                        min="1"
                        placeholder="Type to search"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="Name"
                width="180">
                <template slot="header" slot-scope="scope">
                    Title
                    <el-input
                        v-model="query.name"
                        placeholder="Type to search"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="description">
                <template slot="header" slot-scope="scope">
                    Description
                    <el-input
                        v-model="query.description"
                        placeholder="Type to search description"/>
                </template>
            </el-table-column>
            <el-table-column
                label="Action"
                width="300"
                align="right">
                <template #default="scope">
                    <el-row>
                        <el-button type="primary" @click="edit(scope.row)">
                            <font-awesome-icon icon="fa-solid fa-user-secret"/>
                            Edit
                        </el-button>
                        <el-button @click="deleteCategory(scope.row.id)" type="danger">
                            <font-awesome-icon icon="fa-solid fa-trash"/>
                            Delete
                        </el-button>
                    </el-row>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.page"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="query.limit"
            layout="sizes, prev, pager, next"
            :total="total">
        </el-pagination>
        <category-edit :editFormVisible="editFormVisible" :item="editItem" @onClose="onFormClose"
                       @onUpdateItemSuccess="onItemUpdate"/>
        <category-create :form-visible="createFormVisible" @onClose="onCreateFormClose"
                         @onCreateItemSuccess="onItemCreate"/>
    </div>
</template>

<script>
import {mapState} from "pinia";
import {onMounted, ref} from "vue";
import {providerStore} from "../../stores/provider";
import {MessageBox} from "element-ui";
import {categoriesStore} from "../../stores/categories";
import CategoryEdit from "./CategoryEdit.vue";
import CategoryCreate from "./CategoryCreate.vue";

export default {
    name: "CategoryTable",
    components: {CategoryEdit, CategoryCreate},
    props: {
        query: {
            type: Object,
            required: false,
            default: () => {
                return {
                    id: null,
                    page: 1,
                    limit: 5,
                    title: null,
                    content: null,
                    category_id: null,
                    category_name: null,
                    sort: null,
                    direction: null,
                }
            }
        }
    },
    setup(props) {
        const fetching = ref(false);
        const useCategoriesStore = categoriesStore();
        const useProviderStore = providerStore();
        const editFormVisible = ref(false);
        const createFormVisible = ref(false);
        const editItem = ref(null);
        const formVisible = ref(false);
        const edit = row => {
            editItem.value = row;
            editFormVisible.value = true;
        };
        const fetchCategories = async () => {
            fetching.value = true;
            try {
                await useCategoriesStore.fetchCategories(props.query);
            } catch (e) {
                useProviderStore.showErrorAlert(e.message)
            }
            fetching.value = false;
        }
        const deleteCategory = async (id) => {
            MessageBox.confirm('This will permanently delete the post. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                fetching.value = true;
                useProviderStore.showSuccessAlert('Delete completed');
                fetching.value = false;
                try {
                    useCategoriesStore.deleteCategory(id);
                } catch (e) {
                    useProviderStore.showErrorAlert(e.message)
                }
                fetchCategories();
            }).catch(() => {
                useProviderStore.showInfoAlert('Delete canceled')
            });
        }
        const tableRowClassName = ({row, rowIndex}) => {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        }

        const clickCreate = async () => {
            createFormVisible.value = true;
        };
        const onFormClose = async () => {
            formVisible.value = false;
            editFormVisible.value = false;
            editItem.value = null;
        };
        const onCreateFormClose = async () => {
            createFormVisible.value = false;
        };
        const sortChange = async ({column, prop, order}) => {
            props.query.sort = prop;
            props.query.direction = order === 'ascending' ? 'asc' : 'desc';
        };

        const onItemUpdate = async () => {
            await fetchCategories();
        };
        const onItemCreate = async () => {
            await fetchCategories();
        };
        const handleSizeChange = (val) => {
            props.query.limit = val;
        }
        const handleCurrentChange = (val) => {
            props.query.page = val;
        }

        onMounted(async () => {
            await fetchCategories();
        });

        return {
            fetching,
            fetchCategories,
            deleteCategory,
            tableRowClassName,
            handleSizeChange,
            handleCurrentChange,
            onItemUpdate,
            onFormClose,
            edit,
            clickCreate,
            editFormVisible,
            editItem,
            sortChange,
            createFormVisible,
            onCreateFormClose,
            onItemCreate
        }
    },
    watch: {
        query: {
            handler: async function (newVal, oldVal) {
                console.log('watch query', newVal, oldVal)
                await this.fetchCategories();
            },
            deep: true
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
