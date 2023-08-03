<template>
    <el-dialog
        :title="'Create Category'"
        width="50%"
        :visible.sync="this.formVisible"
        :before-close="handleClose">
        <ValidationObserver v-slot="{ invalid }">
            <el-form @submit.prevent="onSubmit">
                <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                    <el-form-item label="Name" :error="errors[0]">
                        <el-input
                            placeholder="Please input name"
                            v-model="form.name"
                            clearable>
                        </el-input>
                    </el-form-item>
                </ValidationProvider>
                <ValidationProvider name="Description" rules="" v-slot="{ errors }">
                    <el-form-item label="Description" :error="errors[0]">
                        <el-input
                            placeholder="Please input description"
                            v-model="form.description"
                            type="textarea"
                            clearable>
                        </el-input>
                    </el-form-item>
                </ValidationProvider>
                <el-button type="primary" @click="onSubmit" :disabled="invalid">Submit</el-button>
            </el-form>
        </ValidationObserver>
    </el-dialog>
</template>

<script>
import {providerStore} from "../../stores/provider";
import {MessageBox} from "element-ui";
import {reactive, watch} from "vue";
import {categoriesStore} from "../../stores/categories";

export default {
    name: "CreateCategory",
    props: {
        formVisible: {
            type: Boolean,
            required: true
        },
        item: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    description: '',
                }
            },
        }
    },
    setup(props, {emit}) {
        const useProviderStore = providerStore();
        const form = reactive({
            name: '',
            description: '',
        });
        //watch item and set form
        watch(() => props.item, (item) => {
            form.name = item?.name ?? null;
            form.description = item?.description ?? null;
        });
        const useCategoriesStore = categoriesStore();
        const onSubmit = () => {
            MessageBox.confirm('Are you sure ?', 'Create Category', {
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
                        const response = await useCategoriesStore.createCategory(form);
                        const {success, message} = response.data ?? [];
                        if (success) {
                            resetForm();
                            emit("onCreateItemSuccess");
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
            form.name = null;
            form.description = null;
        }
        return {
            handleClose,
            onClose,
            onSubmit,
            form,
            resetForm
        };
    }
};
</script>
