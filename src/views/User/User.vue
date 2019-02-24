<template>
    <div>
        <h3>用户个人中心</h3>
        <nav>
            <router-link to="/user/collected">收藏</router-link>
            <router-link to="/user/following">关注</router-link>
            <router-link to="/user/follower">粉丝</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
