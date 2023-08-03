<template>
    <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">
            <router-link :to="{ name: 'Posts.List'}">Post List</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link :to="{ name: 'Categories.List'}">Categories</router-link>
        </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    name: "NavBar",
}
</script>
<style lang="scss" scoped>
.el-menu-demo {
    a {
        text-decoration: unset !important;
    }
}
</style>
