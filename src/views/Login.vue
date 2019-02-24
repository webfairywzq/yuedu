<template>
    <div>
        <input type="text" v-model="user.email">
        <input type="text" v-model="user.password">
        <button @click="login">登录</button>
    </div>
</template>

<script>
import axios from '../axios'
export default {
    data(){
        return {
            user:{
                email:"",
                password:""
            }
        }
    },
    methods:{
        login(){
            // 调用登录接口
            axios.post("/user/login",this.user).then(res => {
                if(res.data.res_code === 200){
                    localStorage.setItem('token','Bearer '+res.data.res.token);
                    const url=this.$route.query.returnURL;
                    this.$router.replace(url);
                }
            })
        }
    }
}
</script>

<style>

</style>
