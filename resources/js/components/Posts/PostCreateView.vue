<template>
    <el-row class="post-edit-row" v-loading="loading">
        <el-col :span="12">
            <ValidationObserver v-slot="{ invalid }">
                <el-form @submit.prevent="onSubmit">
                    <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
                        <el-form-item label="Title" :error="errors[0]">
                            <el-input
                                placeholder="Please input"
                                v-model="item.title"
                                clearable>
                            </el-input>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider name="Content" rules="" v-slot="{ errors }">
                        <el-form-item label="Content" :error="errors[0]">
                            <el-input
                                placeholder="Please input"
                                v-model="item.content"
                                type="textarea"
                                clearable>
                            </el-input>
                        </el-form-item>
                    </ValidationProvider>
                    <ValidationProvider name="Category" rules="required" v-slot="{ errors }">
                        <el-form-item label="Category" :error="errors[0]">
                            <br>
                            <!--                            <CategorySelect v-bind:category_id="item.category_id"-->
                            <!--                                            v-bind:without-all="true"-->
                            <!--                                            @update-category="updateCategory">-->
                            <!--                                -->
                            <!--                            </CategorySelect>-->
                            <CategorySelect v-model="item.category_id"
                                            v-bind:category_id="item.category_id"
                                            v-bind:without-all="true"></CategorySelect>
                        </el-form-item>
                    </ValidationProvider>
                    <el-button type="primary" @click="onSubmit(item)" :disabled="invalid">Submit</el-button>
                </el-form>
            </ValidationObserver>
        </el-col>
    </el-row>
</template>

<script>
import {providerStore} from "../../stores/provider";
import CategorySelect from "../Categories/CategoriesSelect.vue";
import {MessageBox} from "element-ui";
import {postsStore} from "../../stores/posts";
import {ref} from "vue";
import router   from "../../router";

export default {
    name: "PostEdit",
    components: {CategorySelect},
    setup() {
        const useProviderStore = providerStore();
        const usePostStore = postsStore();
        const loading = ref(false);

        const item = ref({
            title: "",
            content: "",
            category_id: "",
        });
        const onSubmit = (item) => {
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
                        const values = Object.values(item);
                        console.log(values, 'values')
                        for (let i = 0; i < values.length; i++) {
                            formData.append(Object.keys(item)[i], values[i]);
                        }
                        const response = await usePostStore.createPost(formData);
                        //get id from response and push route to post detail
                        const id = response.data.data.id;
                        const message = response.data.message;
                        useProviderStore.showSuccessAlert(message);
                        await router.push('/posts/edit/' + id);
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

        const updateCategory = (value) => {
            alert(value)
            item.category_id = value;
        }
        return {
            onSubmit,
            updateCategory,
            loading,
            item
        };
    },
};
</script>
<style lang="scss" scoped>
.post-edit-row {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
