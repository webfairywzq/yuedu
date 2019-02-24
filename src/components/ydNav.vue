<template>
    <div class="nav">
        <nav>
            <router-link :to="'/channel/'+type.id" v-for="type in types" :key="type.id">{{type.type}}</router-link>
            <router-link to="/login">登录</router-link>
            <router-link to="/setting">设置</router-link>
            <router-link to="/user/collected">个人中心</router-link>
        </nav>
    </div>
    
</template>

<script>
import axios from '../axios'
import bus from '../bus'
export default {
    data(){
        return {
            types:[]
        }
    },
    created(){
        axios.get('/types').then((res) => {
            // console.log(res.data.res);
            this.types=res.data.res;
            // bus.$emit('gain',this.types);
            localStorage.setItem('type', JSON.stringify(this.types))
        })
    }
}
</script>

<style>
    .nav{
        width: 100%;
        background: rgb(172, 40, 40);
    }
    nav{
        /* width: 100%; */
        width: 1010px;
        padding: 10px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        /* background: rgb(172, 40, 40); */
    }
    nav a{
        /* width: 60px; */
        padding: 5px;
        height: 30px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        /* color: black; */
        
        /* background: #fff; */
        border-radius: 5px;
    }
    nav a.router-link-active{
        background: #fff;
        color: black;
    }
</style>
