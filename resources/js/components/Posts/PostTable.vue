<template>
    <div>
        <el-table
            v-loading="fetching"
            :data="posts"
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
                        placeholder="Type to search"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="Title"
                sortable="custom"
                width="180">
                <template slot="header" slot-scope="scope">
                    <div class="span-cs">Title</div>
                    <el-input
                        v-model="query.title"
                        class="w75"
                        placeholder="Type to search"/>
                </template>
                <template slot-scope="scope">
                    <router-link :to="{name: 'Post.Edit', params: {id: scope.row.id}}">
                        {{ scope.row.title }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column
                prop="category.name"
                label="Category"
                sortable="custom"
                width="180">
                <template slot="header" slot-scope="scope">
                    <span class="span-cs">Category</span>
                    <categories-select
                        v-model="query.category_id"
                        v-on:input="onCategoryChange"
                        class="w75"
                        placeholder="Type to search"/>
                </template>
            </el-table-column>
            <el-table-column
                sortable="custom"
                prop="content">
                <template slot="header" slot-scope="scope">
                    <div class="span-cs">Content</div>
                    <el-input
                        v-model="query.content"
                        class="w75"
                        placeholder="Type to search"/>
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
                        <el-button @click="deletePost(scope.row.id)" type="danger">
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
        <post-edit-modal :editFormVisible="editFormVisible" :item="editItem" @onClose="onFormClose"
                         @onUpdateItemSuccess="onItemUpdate"/>
    </div>
</template>

<script>
import {mapState} from "pinia";
import {postsStore} from "../../stores/posts";
import {onMounted, ref} from "vue";
import {providerStore} from "../../stores/provider";
import {MessageBox} from "element-ui";
import PostEditModal from "./PostEditModal.vue";
import CategoriesSelect from "../Categories/CategoriesSelect.vue";

export default {
    name: "PostTable",
    components: {CategoriesSelect, PostEditModal},
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
        const usePostsStore = postsStore();
        const useProviderStore = providerStore();
        const editFormVisible = ref(false);
        const editItem = ref(null);
        const formVisible = ref(false);
        const edit = row => {
            editItem.value = row;
            editFormVisible.value = true;
        };
        const fetchPosts = async () => {
            fetching.value = true;
            try {
                await usePostsStore.fetchPosts(props.query);
            } catch (e) {
                useProviderStore.showErrorAlert(e.message)
            }
            fetching.value = false;
        }
        const deletePost = async (id) => {
            MessageBox.confirm('This will permanently delete the post. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                fetching.value = true;
                useProviderStore.showSuccessAlert('Delete completed');
                fetching.value = false;
                try {
                    usePostsStore.deletePost(id);
                } catch (e) {
                    useProviderStore.showErrorAlert(e.message)
                }
                fetchPosts();
            }).catch(() => {
                useProviderStore.showInfoAlert('Delete canceled')
            });
        }
        const onCategoryChange = async (value) => {
            props.query.category_id = value;
        }
        const tableRowClassName = ({row, rowIndex}) => {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        }
        const onFormClose = async () => {
            formVisible.value = false;
            editFormVisible.value = false;
            editItem.value = null;
        };
        const sortChange = async ({column, prop, order}) => {
            props.query.sort = prop;
            props.query.direction = order === 'ascending' ? 'asc' : 'desc';
        };

        const onItemUpdate = async () => {
            await fetchPosts();
        };
        const handleSizeChange = (val) => {
            props.query.limit = val;
        }
        const handleCurrentChange = (val) => {
            props.query.page = val;
        }

        onMounted(async () => {
            await fetchPosts();
        });
        //watch deep query
        // watch(() => props.query, async (newVal, oldVal) => {
        //     await fetchPosts();
        // }, {deep: true});
        return {
            fetching,
            fetchPosts,
            deletePost,
            tableRowClassName,
            handleSizeChange,
            handleCurrentChange,
            onItemUpdate,
            onFormClose,
            edit,
            editFormVisible,
            editItem, sortChange, onCategoryChange
        }
    },
    watch: {
        query: {
            handler: async function (newVal, oldVal) {
                console.log('watch query', newVal, oldVal)
                await this.fetchPosts();
            },
            deep: true
        }
    },
    computed: {
        ...mapState(postsStore, {
            posts: "getPosts",
            total: "getTotal",
        })
    }
}
</script>
<style lang="css" scoped>
.span-cs {
    width: 100%;
}

.w75 {
    width: 75%;
}
</style>

