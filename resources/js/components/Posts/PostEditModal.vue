<template>
    <el-dialog
        :title="'Edit: ' + form.title"
        width="50%"
        :visible.sync="this.editFormVisible"
        :before-close="handleClose">
        <ValidationObserver v-slot="{ invalid }">
            <el-form @submit.prevent="onSubmit">
                <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
                    <el-form-item label="title" :error="errors[0]">
                        <el-input
                            placeholder="Please input"
                            v-model="form.title"
                            clearable>
                        </el-input>
                    </el-form-item>
                </ValidationProvider>
                <ValidationProvider name="Content" rules="" v-slot="{ errors }">
                    <el-form-item label="Content" :error="errors[0]">
                        <el-input
                            placeholder="Please input"
                            v-model="form.content"
                            type="textarea"
                            clearable>
                        </el-input>
                    </el-form-item>
                </ValidationProvider>
                <ValidationProvider name="Category" rules="required" v-slot="{ errors }">
                    <el-form-item label="Category" :error="errors[0]">
                        <br>
                        <CategorySelect v-bind:category_id="form.category_id"
                                        v-bind:without-all="true"
                                        @update-category="updateCategory"></CategorySelect>
                    </el-form-item>
                </ValidationProvider>
                <el-button type="primary" @click="onSubmit" :disabled="invalid">Submit</el-button>
            </el-form>
        </ValidationObserver>
    </el-dialog>
</template>

<script>
import {providerStore} from "../../stores/provider";
import CategorySelect from "../Categories/CategoriesSelect.vue";
import {MessageBox} from "element-ui";
import {reactive, watch} from "vue";
import {postsStore} from "../../stores/posts";

export default {
    name: "PostEditModal",
    components: {CategorySelect},
    props: {
        editFormVisible: {
            type: Boolean,
            required: true
        },
        item: {
            type: Object,
            default: () => {
                return {
                    id: null,
                    title: '',
                    content: '',
                    category: null
                }
            },
        }
    },
    setup(props, {emit}) {
        const useProviderStore = providerStore();
        const form = reactive({
            id: null,
            title: '',
            content: '',
            category_id: ''
        });
        //watch item and set form
        watch(() => props.item, (item) => {
            form.id = item?.id ?? null;
            form.title = item?.title ?? null;
            form.content = item?.content ?? null;
            form.category_id = item?.category?.id ?? null;
        });
        const usePostStore = postsStore();

        const onSubmit = () => {
            MessageBox.confirm('Are you sure ?', 'Update', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                confirmButtonClass: "btn btn-pill btn-gradient color-4 admin-btn",
                cancelButtonClass: "btn btn-dashed btn-pill color-2 admin-btn",
                type: "warning"
            })
                .then(async () => {
                    useProviderStore.actionLoader(true);
                    try {
                        const formData = new FormData();
                        const values = Object.values(form);
                        console.log(values, 'values')
                        for (let i = 0; i < values.length; i++) {
                            formData.append(Object.keys(form)[i], values[i]);
                        }
                        console.log(formData, 'formData', form)
                        const response = await usePostStore.updatePost(formData.get('id'), form);
                        const {success, caseCode, message} = response.data ?? [];
                        if (success) {
                            resetForm();
                            emit("onUpdateItemSuccess");
                            emit("onClose");
                        }
                        useProviderStore.showSuccessAlert(message);
                    } catch (error) {
                        console.log(error, 'error')
                        useProviderStore.showErrorAlert(error);
                    }
                    useProviderStore.actionLoader(false);
                })
                .catch(() => {
                    console.log("cancel");
                });
        };
        const handleClose = () => {
            emit("onClose");
        };
        const onClose = () => {
            emit("onClose");
        };

        //resetForm
        const resetForm = () => {
            form.id = null;
            form.title = null;
            form.content = null;
            form.category_id = null;
        }

        const updateCategory = (value) => {
            form.category_id = value;
        }
        return {
            handleClose,
            onClose,
            onSubmit,
            form,
            updateCategory,
            resetForm
        };
    }
};
</script>
