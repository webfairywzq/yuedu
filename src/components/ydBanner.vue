<template>
    <div class="banner">
        <div class="banner-header">
            <h3 class="other">其他相关节目</h3>
            <div class="control">
                <i class="prev" @click="prev" v-if="active>0">&lt;</i>
                <i class="prev disabled" v-else>&lt;</i>
                <i class="next" @click="next" v-if="active<articles.length-1">&gt;</i>
                <i class="next disabled" v-else>&gt;</i>
            </div>
        </div>
        <transition-group tag="ul" name="banner">
            <li v-for="(articleItems,index) in articles" :key="articleItems[0].id" v-show="active === index">
                <div class="article-item" v-for="(article,index) in articleItems" :key="index">
                    <img :src="article.img_url" width="100%">
                    <router-link :to="'/article/'+article.id" class="banner-title">{{article.title}}</router-link>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active:0
        }
    },
    props:{
        articles:Array
    },
    methods:{
        prev(){
            this.active--;
        },
        next(){
            this.active++;
        }
    }
}
</script>

<style scoped>
    .banner{
        width: 100%;
        padding: 30px;
        background: #fff;
        margin-top: 30px;
    }
    .banner-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h3{
        margin: 0;
        font-size: 14px;
        border-left: 3px solid #ee5044;
        line-height: 14px;
        padding-left: 5px;
    }
    .control i{
        font-style: normal;
    }
    .banner ul{
        position: relative;
        width: 100%;
        height: 296px;
        padding: 0;
    }
    .banner li{
        position: absolute;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background: #fff;
        padding-bottom: 20px;
        margin: 0;
    }
    .article-item{
        width: 135px;
        margin-top: 30px;
    }
    .article-item a{
        font-size: 12px;
        color: rgb(112, 112, 112);
    }
    .banner-title{
        display: block;
        margin-top: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    .next{
        margin-left: 8px;
    }
    .disabled{
        color:#999;
    }

    .banner-enter,
    .banner-leave-to{
        opacity: 0;
    }
    .banner-enter-to,
    .banner-leave{
        opacity: 1;
    }
    .banner-enter-active,
    .banner-leave-active{
        transition: opacity 1.5s;
    }
</style>
